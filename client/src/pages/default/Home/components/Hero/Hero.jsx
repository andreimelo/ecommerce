import React from 'react';

const Hero = () => {
    return (
        <section className='w-full rounded-[32px] bg-slate-50 border border-slate-200 p-8 md:p-12 my-8'>
            <div className='grid gap-8 lg:grid-cols-[1.3fr_0.9fr] items-center'>
                <div className='max-w-2xl'>
                    <p className='text-sm uppercase tracking-[0.35em] text-slate-500 mb-4'>Minimalist shop</p>
                    <h1 className='text-3xl md:text-5xl font-semibold text-slate-950 leading-tight'>Simple gadgets, thoughtfully curated.</h1>
                    <p className='mt-5 text-base text-slate-600 max-w-2xl'>Discover essential electronics and accessories in a calm, elegant shopping experience designed for modern buyers.</p>
                    <div className='mt-8 flex flex-wrap gap-3'>
                        <a href='/shop' className='inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'>Shop essentials</a>
                        {/* <a href='/collections' className='inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100'>Browse collections</a> */}
                    </div>
                </div>
                <div className='hidden md:flex justify-end'>
                    <div className='relative w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm'>
                        <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=60' alt='minimalist tech gadgets' className='w-full object-cover' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
