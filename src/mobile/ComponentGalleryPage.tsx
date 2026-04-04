import React, { useMemo, useState } from "react"
import { getGalleryComponent } from "./gallery-data"
import "./gallery.less"

interface ComponentGalleryPageProps {
    componentKey: string
}

export const ComponentGalleryPage: React.FC<ComponentGalleryPageProps> = ({
    componentKey,
}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [panelVisible, setPanelVisible] = useState(false)
    const [seed, setSeed] = useState(0)

    const component = getGalleryComponent(componentKey)
    const demos = component?.demos || []

    const activeDemo = useMemo(
        () => demos[activeIndex] || demos[0],
        [demos, activeIndex],
    )

    if (!component || !activeDemo) return null

    return (
        <div className="mk-mobile-component-page">
            <div className="mk-mobile-component-card">
                <header className="mk-mobile-component-header">
                    <a
                        href="/gallery"
                        className="mk-mobile-component-back"
                        aria-label="返回"
                    >
                        ‹
                    </a>
                    <div className="mk-mobile-component-title">
                        {component.title}
                    </div>
                    <button
                        type="button"
                        className="mk-mobile-component-switch"
                        onClick={() => setPanelVisible((v) => !v)}
                        aria-label="切换 Demo"
                    >
                        {activeIndex + 1} / {demos.length}
                    </button>

                    {panelVisible && (
                        <div className="mk-mobile-component-demo-panel">
                            {demos.map((item, idx) => (
                                <button
                                    type="button"
                                    key={item.key}
                                    onClick={() => {
                                        setActiveIndex(idx)
                                        setPanelVisible(false)
                                        setSeed((v) => v + 1)
                                    }}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    )}
                </header>

                <div className="mk-mobile-component-screen">
                    <iframe
                        key={`${activeDemo.key}-${seed}`}
                        src={activeDemo.path}
                        title={`${component.title}-${activeDemo.title}`}
                    />
                </div>
            </div>
        </div>
    )
}
