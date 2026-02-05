import React from 'react'
import { motion } from 'framer-motion'

const PropertyCollage = ({ images = [] }) => {
    if (!images || images.length === 0) return null

    // Layout patterns based on image count
    const renderPattern = () => {
        const count = images.length

        if (count === 1) {
            return (
                <div className="w-full h-[500px] rounded-[2rem] overflow-hidden">
                    <img src={images[0]} className="w-full h-full object-cover" alt="" />
                </div>
            )
        }

        if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-4 h-[500px]">
                    {images.map((img, i) => (
                        <div key={i} className="rounded-[2rem] overflow-hidden">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                        </div>
                    ))}
                </div>
            )
        }

        // 3 or more images: Premium Collage Layout
        return (
            <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[600px]">
                <div className="col-span-8 row-span-2 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="" />
                </div>
                <div className="col-span-4 row-span-1 rounded-[2.5rem] overflow-hidden shadow-xl">
                    <img src={images[1]} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="" />
                </div>
                {images[2] && (
                    <div className="col-span-4 row-span-1 rounded-[2.5rem] overflow-hidden shadow-xl relative">
                        <img src={images[2]} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="" />
                        {count > 3 && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                                <span className="text-white text-2xl font-black">+{count - 3}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-12"
        >
            {renderPattern()}
        </motion.div>
    )
}

export default PropertyCollage
