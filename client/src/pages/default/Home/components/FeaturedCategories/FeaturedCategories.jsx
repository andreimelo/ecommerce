import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../../../library/services/category';

const FeaturedCategories = () => {
    const [brands, setBrands] = useState([]);

    async function fetchBrandsData(){
        try {
            const result = await getCategories();
            setBrands(result);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchBrandsData();
    }, []);

    return (
        <section className='my-8'>
            <div className='mb-6'>
                <h3 className='text-xl font-semibold text-slate-900'>Browse categories</h3>
                <p className='mt-2 text-sm text-slate-500'>A calm, clean way to explore our best collections.</p>
            </div>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {brands.map((item) => (
                    <a
                        key={item._id}
                        href={`/category/${item.slug}`}
                        className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg'
                    >
                        <div className='text-sm font-semibold text-slate-900'>{item.name}</div>
                        <div className='mt-2 text-xs text-slate-500'>Explore</div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
