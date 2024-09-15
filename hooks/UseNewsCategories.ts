
import newsCategoryList from '@/constants/Categories';
import React, { useCallback, useState } from 'react'

export const UseNewsCategories = () => {
    const [newsCategories, setNewCategories] = useState(newsCategoryList);

    const toggleNewsCategory = useCallback((id: number) => {
        setNewCategories((prevNewsCategories) => {
            return prevNewsCategories.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }
                return item;
            })
        });
    }, []);

    return {
        newsCategories,
        toggleNewsCategory
    }
}