---
name: code-review
description: Review code changes for readability, maintainability, extensibility, robustness, security, and performance. Use when the user asks to review code, review a diff, review changes, or uses keywords like "review", "代码审查", "review 代码", "CR".
---

# Code Review

通过 git diff 获取代码变更，结合上下文进行代码审查。

## 工作流程

### Step 1: 获取变更

定义排除规则（后续命令复用）：

```bash
EXCLUDE="':!pnpm-lock.yaml' ':!yarn.lock' ':!package-lock.json' ':!*.snap' ':!dist/' ':!lib/' ':!es/'"
```

按优先级依次尝试，取第一个有内容的结果：

1. **工作区 + 暂存区变更**（优先）：

```bash
git diff --stat -- . $EXCLUDE
git diff --cached --stat -- . $EXCLUDE
# 有内容则获取详细 diff
git diff -- . $EXCLUDE
git diff --cached -- . $EXCLUDE
```

2. 如果上述均为空，**获取最近一次提交**：

```bash
git diff HEAD~1 --stat -- . $EXCLUDE
git diff HEAD~1 -- . $EXCLUDE
```

3. 如果用户指定了对比分支：

```bash
git diff <base-branch>...HEAD -- . $EXCLUDE
```

### Step 2: 阅读完整上下文

对**每个变更文件**，使用 Read 工具读取完整内容，理解：

-   文件的整体职责和在项目中的位置
-   变更代码的上下文（周围函数、导入、类型定义）
-   组件 props 接口和使用方式
-   如有必要，阅读被变更代码引用或依赖的其他文件

### Step 3: 逐维度审查

按以下 7 个维度逐一审查。只输出**发现了问题或值得肯定**的维度，无问题的维度跳过。

---

#### 正确性

-   逻辑是否正确，边界条件（空值、空数组、undefined）是否处理
-   类型是否准确，是否有 `as any`、`eslint-disable @typescript-eslint/no-explicit-any` 等不安全的类型断言或绕过
-   Hooks 依赖项（useEffect / useMemo / useCallback 的 deps 数组）是否正确且完整
-   是否有潜在的运行时错误（如 `value.length` 未先判空、解构 undefined 对象等）
-   antd 包装组件的值类型转换（如 string ↔ dayjs）是否处理了所有分支（null、undefined、多选空项）
-   `forwardRef` + `useImperativeHandle` 暴露的方法是否与 Ref 类型定义一致，内部引用是否可能为 null

---

#### 可读性

-   命名是否清晰、语义化（变量、函数、组件、文件名）
-   文件和文件夹命名是否遵循 kebab-case，**不存在例外**（`.tsx` 组件文件、`.less` 样式文件、`.ts` 工具文件均需遵守，如 `my-component.tsx`、`my-component.less`）
-   CSS class 命名是否遵循 BEM 规范：Block（`mk-component-name`）→ Element（`__element`）→ Modifier（`--modifier`），禁止使用无语义的缩写或与 BEM 结构不符的命名
-   代码结构是否易于理解，逻辑分层是否合理
-   是否有不必要的复杂度可以简化
-   注释是否必要且准确（避免冗余注释，关键决策处要有注释）

---

#### 可维护性

-   是否遵循项目现有模式和约定
-   组件目录结构是否符合约定：
    -   简单组件：`index.tsx` + `index.less` + `index.md` + `demos/`
    -   复杂组件：`index.ts`（统一导出）+ `Component.tsx` + `types.ts` + 自定义 Hook + 子组件目录
-   是否有重复代码可以抽取复用（项目已有公共工具：`getPrefixCls`、`arrayify`、`useDateFormat`、`useCommonCache` 等）
-   模块职责是否单一，耦合度是否合理
-   API 设计是否直观，对外接口是否稳定

---

**健壮性**

-   错误处理是否充分
-   是否处理了空值、undefined、空数组等边界情况
-   对外部依赖（第三方库 API）的使用是否正确
-   是否有隐式依赖（如依赖全局状态或副作用执行顺序）

---

#### 安全性

-   是否存在 XSS 风险（如 `dangerouslySetInnerHTML`、未转义的用户输入直接渲染到 DOM）
-   是否有 `console.log` / `console.error` 遗留（ESLint `no-console` 为 warn，生产代码应移除）
-   敏感信息（密钥、token）是否泄露到前端代码中
-   第三方依赖是否存在已知漏洞，是否使用了不受信任的来源
-   是否有不安全的正则表达式（ReDoS 风险）

---

#### 拓展性

-   **API 兼容性**：封装 antd 组件时，是否保留了原有 API 及其功能
-   **向后兼容**：迭代已有组件时，Props 是否仅新增不删减，默认行为是否保持不变
-   **预留拓展空间**：是否考虑了自定义场景（如 render prop、`component` 配置项、泛型参数、`extraActions` / `extraContent` 等插槽）
-   **类型导出完整性**：Props 类型和公共类型是否从 `index.ts` 导出，供使用者引用；泛型默认值是否合理（优先用 `Record<string, unknown>` 替代 `Record<string, any>`）
-   **易用性**：API 命名是否符合 [antd 命名规则](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)，是否适当处理边界情况降低使用者心智负担
-   **样式可覆盖性**：
    -   是否使用 `getPrefixCls('component-name')` 生成根类名（定义在 `src/utils/index.ts`，前缀为 `hg-info-ui-kit-mobile-`）
    -   子元素类名是否严格遵循 BEM 规范：Block 为根类名（由 `getPrefixCls` 生成），Element 以 `__element` 命名，Modifier 以 `--modifier` 命名，在 Less 中通过 `&__element`、`&--modifier` 嵌套（而非硬编码独立类名）
    -   Less 中是否使用 `@prefixCls` 拼接组件样式、`@antPrefixCls` 拼接 antd 覆盖样式（变量定义在 `src/styles/variables.less`）
    -   是否避免了 CSS Module（项目约定不使用，方便业务系统覆盖）
    -   是否避免了 `!important` 和过深的样式层级

---

#### 执行效率

-   是否有不必要的重渲染（如对象/数组字面量直接作为 props 导致子组件每次重渲染）
-   `useMemo` / `useCallback` 的使用是否合理（不过度、不遗漏关键计算和回调）
-   事件处理函数引用是否稳定（推荐使用 ahooks `useMemoizedFn` 或 `useCallback` 保持引用稳定）
-   是否有可以提前 return 避免无效计算的场景
-   大数据量场景是否考虑了性能优化（虚拟滚动、分页、防抖搜索等）
-   数据结构和算法选择是否合适（如使用 `Map` 替代重复遍历查找）

---

### Step 4: 输出审查结果

使用以下格式组织输出：

```markdown
## 改动概要

[用 1-3 句话概括本次变更的目的和范围]

## 问题

### [严重] 问题标题

> 文件: `path/to/file.ts` L 行号

问题描述，说明为什么是问题以及可能的影响。

**建议**: 具体的修改建议或代码示例。

### [建议] 问题标题

> 文件: `path/to/file.ts` L 行号

问题描述和改进建议。

## 做得好的地方

-   [列出值得肯定的设计决策或实现方式]

## 总结

| 优先级 | 数量 | 涉及维度              |
| ------ | ---- | --------------------- |
| 严重   | N    | 正确性 / 健壮性 / ... |
| 建议   | N    | 可读性 / 拓展性 / ... |
```

## 审查原则

-   **先理解意图，再评审代码**：理解变更的目的后再开始审查
-   **区分严重程度**：`[严重]` 必须修复的 Bug、安全问题或破坏性变更；`[建议]` 可改进但不阻塞的优化项
-   **给出具体建议**：不只指出问题，还要提供可行的代码修改方案
-   **肯定好的实践**：指出代码中做得好的地方，鼓励优秀的设计决策
-   **不做重复劳动**：ESLint / Stylelint 已覆盖的纯格式问题不再审查（缩进、分号、引号等）
-   **聚焦实际影响**：优先关注正确性和健壮性，其次是拓展性和可维护性
