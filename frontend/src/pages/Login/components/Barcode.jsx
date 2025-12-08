import React from 'react';
import { motion } from 'framer-motion';

const Barcode = () => {
    const barcodeLines = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        width: Math.random() > 0.5 ? 2 : 3,
        height: 20 + Math.random() * 15
    }));

    return (
        <div className="barcode-section">
            <div className="barcode">
                {barcodeLines.map((line) => (
                    <motion.div
                        key={line.id}
                        className="barcode-line"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: line.id * 0.02, duration: 0.3 }}
                        style={{
                            '--barcode-width': `${line.width}px`,
                            '--barcode-height': `${line.height}px`
                        }}
                    />
                ))}
            </div>
            <div className="barcode-text">REG-2024-TRAVEL</div>

            {/* Scanner line animation */}
            <motion.div
                className="scanner-line"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

export default Barcode;
