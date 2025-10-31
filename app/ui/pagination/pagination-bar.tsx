'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PaginationBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPage = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const disabled = currentPage === 1;

    useEffect(() => {
        const pageFromUrl = Number(searchParams.get('page')) || 1;
        if (pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl);
        }
    }, [searchParams]);

    const handleChangePage = (page: number): void => {
        const params = new URLSearchParams(searchParams.toString());

        if (page <= 1) {
            params.delete('page');
        } else {
            params.set('page', String(page));
        }

        setCurrentPage(page);
        router.replace(`?${params.toString()}`, { scroll: false });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <motion.div
            className="w-full flex items-center justify-between mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={!disabled ? { scale: 1.05 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="flex flex-wrap gap-1 items-center cursor-pointer text-[#66fcf0] disabled:cursor-not-allowed disabled:text-gray-500"
                disabled={disabled}
                onClick={() => !disabled && handleChangePage(currentPage - 1)}
            >
                <Image
                    src={disabled ? '/icons/page.arrow-gray.svg' : '/icons/page.arrow.svg'}
                    width={24}
                    height={24}
                    alt="arrow"
                    className="rotate-180"
                />
                <span className="text-lg font-medium">Назад</span>
            </motion.button>

            <motion.span
                key={currentPage} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white text-lg font-semibold"
            >
                {currentPage}
            </motion.span>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="flex flex-wrap gap-1 items-center cursor-pointer"
                onClick={() => handleChangePage(currentPage + 1)}
            >
                <span className="text-[#66fcf0] text-lg font-medium">Вперёд</span>
                <Image src="/icons/page.arrow.svg" width={24} height={24} alt="arrow" />
            </motion.button>
        </motion.div>
    );
}
