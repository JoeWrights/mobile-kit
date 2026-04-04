import "./gallery.less"

import React, { useMemo, useState } from "react"

import { galleryComponents } from "./gallery-data"

export const GalleryPage: React.FC = () => {
    const [keyword, setKeyword] = useState("")

    const list = useMemo(() => {
        const normalized = keyword.trim().toLowerCase()
        if (!normalized) return galleryComponents
        return galleryComponents.filter(
            (item) =>
                item.key.toLowerCase().includes(normalized) ||
                item.title.toLowerCase().includes(normalized),
        )
    }, [keyword])

    return (
        <div className="mk-gallery-page">
            <div className="mk-gallery-card">
                <header className="mk-gallery-header">Mobile Kit</header>
                <div className="mk-gallery-body">
                    <input
                        className="mk-gallery-search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="搜索组件"
                    />

                    <div className="mk-gallery-section-title">通用</div>
                    <div className="mk-gallery-list">
                        {list.map((item) => (
                            <a
                                key={item.key}
                                href={item.route}
                                className="mk-gallery-item"
                            >
                                <span>{item.title}</span>
                                <span className="mk-gallery-item-arrow">›</span>
                            </a>
                        ))}
                        {list.length === 0 && (
                            <div className="mk-gallery-empty">
                                未找到匹配组件
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
