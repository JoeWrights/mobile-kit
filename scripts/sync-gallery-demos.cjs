const fs = require("fs")
const path = require("path")

const projectRoot = process.cwd()
const mdLoaderDir = path.join(projectRoot, "node_modules/.cache/dumi/md-loader")
const galleryTsPath = path.join(projectRoot, "src/mobile/gallery-data.ts")
const galleryJsPath = path.join(projectRoot, "public/gallery/data.js")
const componentsRoot = path.join(projectRoot, "src/components")
const docsGalleryRoot = path.join(projectRoot, "docs/gallery")

const normalizeFile = (file) => file.replaceAll("\\\\", "/")

const toGalleryDocTitle = (componentKey) => {
    return componentKey
        .split(/[_-]/g)
        .filter(Boolean)
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join("")
}

const renderGalleryDocMarkdown = (componentKey) => {
    return [
        "---",
        `title: Gallery ${toGalleryDocTitle(componentKey)}`,
        "sidebar: false",
        "mobile: false",
        "---",
        "",
        "<iframe",
        `  src="/gallery/component.html?component=${componentKey}"`,
        '  style="width:100%;height:calc(100vh - 120px);min-height:640px;border:0;display:block;"',
        "></iframe>",
        "",
    ].join("\n")
}

const ensureGalleryDoc = (componentKey) => {
    const galleryDocPath = path.join(docsGalleryRoot, `${componentKey}.md`)
    if (fs.existsSync(galleryDocPath)) return { created: false, galleryDocPath }
    if (!fs.existsSync(docsGalleryRoot)) {
        fs.mkdirSync(docsGalleryRoot, { recursive: true })
    }
    fs.writeFileSync(
        galleryDocPath,
        renderGalleryDocMarkdown(componentKey),
        "utf8",
    )
    return { created: true, galleryDocPath }
}

const parseTitleFromMarkdown = (markdown, fallback) => {
    const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim()
    return heading || fallback
}

const prettifyDemoTitle = (name) => {
    const mapping = {
        basic: "基础用法",
        rounded: "圆角开关",
        position: "弹出方向",
    }
    if (mapping[name]) return mapping[name]
    return name.replace(/[_-]/g, " ")
}

const extractDemosFromMarkdown = (markdown, componentKey) => {
    const lines = markdown.split(/\r?\n/)
    let currentSection = ""
    const rawDemos = []

    for (const line of lines) {
        const sectionMatched = line.match(/^##\s+(.+)$/)
        if (sectionMatched) {
            currentSection = sectionMatched[1].trim()
        }

        const codePattern = /<code\s+src=["']\.\/demos\/([^"']+)\.tsx["'][^>]*>/g
        for (const matched of line.matchAll(codePattern)) {
            const fileName = matched[1]
            rawDemos.push({
                sectionTitle: currentSection,
                fileName,
                source: `src/components/${componentKey}/demos/${fileName}.tsx`,
            })
        }
    }

    const sectionCount = rawDemos.reduce((acc, item) => {
        const key = item.sectionTitle || "__NO_SECTION__"
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {})

    return rawDemos.map((item, idx) => {
        const sectionKey = item.sectionTitle || "__NO_SECTION__"
        const title =
            sectionCount[sectionKey] > 1
                ? prettifyDemoTitle(item.fileName)
                : item.sectionTitle || prettifyDemoTitle(item.fileName)

        return {
            key: `demo${idx + 1}`,
            title,
            source: item.source,
        }
    })
}

const discoverGalleryConfig = () => {
    if (!fs.existsSync(componentsRoot)) {
        return { config: [], createdGalleryDocs: [] }
    }

    const componentDirs = fs
        .readdirSync(componentsRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort((a, b) => a.localeCompare(b))

    const config = []
    const createdGalleryDocs = []

    for (const key of componentDirs) {
        const componentDir = path.join(componentsRoot, key)
        const indexMdPath = path.join(componentDir, "index.md")
        const demosDir = path.join(componentDir, "demos")
        if (!fs.existsSync(indexMdPath) || !fs.existsSync(demosDir)) continue

        const markdown = fs.readFileSync(indexMdPath, "utf8")
        const title = parseTitleFromMarkdown(markdown, key)

        let demos = extractDemosFromMarkdown(markdown, key)

        if (demos.length === 0) {
            const demoFiles = fs
                .readdirSync(demosDir)
                .filter((file) => file.endsWith(".tsx"))
                .sort((a, b) => a.localeCompare(b))

            demos = demoFiles.map((file, idx) => {
                const fileBase = file.replace(/\.tsx$/, "")
                return {
                    key: `demo${idx + 1}`,
                    title: prettifyDemoTitle(fileBase),
                    source: `src/components/${key}/demos/${file}`,
                }
            })
        }

        if (demos.length === 0) continue

        const { created, galleryDocPath } = ensureGalleryDoc(key)
        if (created) {
            createdGalleryDocs.push(
                normalizeFile(path.relative(projectRoot, galleryDocPath)),
            )
        }
        const route = `/gallery/${key}`

        config.push({
            key,
            title,
            route,
            demos,
        })
    }

    return { config, createdGalleryDocs }
}

const fallbackDemoId = (componentKey, source) => {
    const name = path.basename(source, path.extname(source))
    return `${componentKey}-demo-${name}`
}

const collectDemoCandidates = () => {
    const candidatesMap = new Map()
    if (!fs.existsSync(mdLoaderDir)) return candidatesMap

    const files = fs.readdirSync(mdLoaderDir)
    const pattern = /"demo":\s*{\s*"id":\s*"([^"]+)"\s*}[\S\s]*?"previewerProps":\s*{\s*"filename":\s*"([^"]+)"/g

    for (const file of files) {
        const fullPath = path.join(mdLoaderDir, file)
        if (!fs.statSync(fullPath).isFile()) continue

        try {
            const raw = fs.readFileSync(fullPath, "utf8")
            const parsed = JSON.parse(raw)
            const content = parsed?.value?.content
            if (typeof content !== "string") continue

            const mtimeMs = fs.statSync(fullPath).mtimeMs
            for (const matched of content.matchAll(pattern)) {
                const demoId = matched[1]
                const filename = normalizeFile(matched[2])
                if (!demoId || !filename) continue
                const list = candidatesMap.get(filename) || []
                list.push({ id: demoId, mtimeMs })
                candidatesMap.set(filename, list)
            }
        } catch {
            // Ignore invalid cache files.
        }
    }

    return candidatesMap
}

const pickBestDemoId = ({ candidates, componentKey, source }) => {
    if (candidates.length === 0) return
    const demoName = path.basename(source, path.extname(source))
    const expectedSrc = `src-components-${componentKey}-demo-${demoName}`
    const expectedLegacy = `${componentKey}-demo-${demoName}`

    const score = (id) => {
        if (id === expectedSrc) return 100
        if (id === expectedLegacy) return 90
        if (id.includes(`${componentKey}-demo-${demoName}`)) return 70
        if (id.startsWith("src-components-")) return 60
        if (id.startsWith("docs-gallery-demos-")) return 10
        return 20
    }

    const sorted = [...candidates].sort((a, b) => {
        const scoreDiff = score(b.id) - score(a.id)
        if (scoreDiff !== 0) return scoreDiff
        return b.mtimeMs - a.mtimeMs
    })
    return sorted[0]?.id
}

const buildResolvedConfig = (galleryConfig, candidatesMap) => {
    return galleryConfig.map((component) => ({
        ...component,
        demos: component.demos.map((demo) => {
            const candidates = candidatesMap.get(demo.source) || []
            const bestId = pickBestDemoId({
                candidates,
                componentKey: component.key,
                source: demo.source,
            })
            const resolvedDemoId =
                bestId || fallbackDemoId(component.key, demo.source)
            return {
                key: demo.key,
                title: demo.title,
                path: `/~demos/${resolvedDemoId}`,
            }
        }),
    }))
}

const renderTs = (resolvedConfig) => {
    const lines = []
    lines.push("export interface GalleryDemoItem {")
    lines.push("    key: string")
    lines.push("    title: string")
    lines.push("    path: string")
    lines.push("}")
    lines.push("")
    lines.push("export interface GalleryComponentItem {")
    lines.push("    key: string")
    lines.push("    title: string")
    lines.push("    route: string")
    lines.push("    demos: GalleryDemoItem[]")
    lines.push("}")
    lines.push("")
    lines.push("/**")
    lines.push(" * 按 PC 端组件菜单顺序维护移动端组件列表")
    lines.push(" * 由 scripts/sync-gallery-demos.cjs 自动生成")
    lines.push(" */")
    lines.push("export const galleryComponents: GalleryComponentItem[] = [")

    for (const component of resolvedConfig) {
        lines.push("    {")
        lines.push(`        key: "${component.key}",`)
        lines.push(`        title: "${component.title}",`)
        lines.push(`        route: "${component.route}",`)
        lines.push("        demos: [")
        for (const demo of component.demos) {
            lines.push("            {")
            lines.push(`                key: "${demo.key}",`)
            lines.push(`                title: "${demo.title}",`)
            lines.push(`                path: "${demo.path}",`)
            lines.push("            },")
        }
        lines.push("        ],")
        lines.push("    },")
    }
    lines.push("]")
    lines.push("")
    lines.push("export const getGalleryComponent = (key: string) => {")
    lines.push("    return galleryComponents.find((item) => item.key === key)")
    lines.push("}")
    lines.push("")
    return lines.join("\n")
}

const renderJs = (resolvedConfig) => {
    const lines = []
    lines.push("// Auto-generated by scripts/sync-gallery-demos.cjs")
    lines.push("window.GALLERY_COMPONENTS = [")
    for (const component of resolvedConfig) {
        lines.push("    {")
        lines.push(`        key: "${component.key}",`)
        lines.push(`        title: "${component.title}",`)
        lines.push(`        route: "${component.route}",`)
        lines.push("        demos: [")
        for (const demo of component.demos) {
            lines.push("            {")
            lines.push(`                key: "${demo.key}",`)
            lines.push(`                title: "${demo.title}",`)
            lines.push(`                path: "${demo.path}",`)
            lines.push("            },")
        }
        lines.push("        ],")
        lines.push("    },")
    }
    lines.push("]")
    lines.push("")
    return lines.join("\n")
}

const printResolvedDemoMap = (resolvedConfig) => {
    console.log("[sync-gallery-demos] resolved demo ids:")
    for (const component of resolvedConfig) {
        console.log(`  - ${component.key} (${component.title})`)
        for (const demo of component.demos) {
            const demoId = demo.path.replace("/~demos/", "")
            console.log(`      ${demo.key}: ${demoId}`)
        }
    }
}

const { config: galleryConfig, createdGalleryDocs } = discoverGalleryConfig()
const candidatesMap = collectDemoCandidates()
const resolvedConfig = buildResolvedConfig(galleryConfig, candidatesMap)

fs.writeFileSync(galleryTsPath, renderTs(resolvedConfig), "utf8")
fs.writeFileSync(galleryJsPath, renderJs(resolvedConfig), "utf8")

console.log(
    `[sync-gallery-demos] synced ${resolvedConfig.length} components, detected sources: ${candidatesMap.size}`,
)
if (createdGalleryDocs.length > 0) {
    console.log("[sync-gallery-demos] created gallery docs:")
    for (const docPath of createdGalleryDocs) {
        console.log(`  - ${docPath}`)
    }
}
printResolvedDemoMap(resolvedConfig)
