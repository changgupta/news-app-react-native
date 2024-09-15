
import CountryList from '@/constants/CountryList';
import React, { useCallback, useState } from 'react'

export const UseNewsCountries = () => {
    const [newsCountries, setNewCountries] = useState(CountryList);

    const toggleNewsCountry = useCallback((id: number) => {
        setNewCountries((prevNewsCountries) => {
            return prevNewsCountries.map((item, index) => {
                if (index === id) {
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
        newsCountries,
        toggleNewsCountry
    }
}