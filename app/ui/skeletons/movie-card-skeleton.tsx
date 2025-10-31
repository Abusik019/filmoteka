'use client';

import { motion } from 'framer-motion';

export default function MovieCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 p-3 rounded-xl border border-gray-700"
        >
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-800 animate-pulse" />
            <div className="h-5 bg-gray-800 rounded mt-3 w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded mt-2 w-1/2 animate-pulse" />
        </motion.div>
    );
}
