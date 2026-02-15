import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const products = [
  {
    image: '/images/iron-pipes.jpg',
    titleKey: 'product_iron_title',
    descKey: 'product_iron_desc',
    features: ['product_iron_f1', 'product_iron_f2', 'product_iron_f3'],
  },
  {
    image: '/images/galvanized-pipes.jpg',
    titleKey: 'product_galvanized_title',
    descKey: 'product_galvanized_desc',
    features: ['product_galvanized_f1', 'product_galvanized_f2', 'product_galvanized_f3'],
  },
  {
    image: '/images/steel-profiles.jpg',
    titleKey: 'product_profiles_title',
    descKey: 'product_profiles_desc',
    features: ['product_profiles_f1', 'product_profiles_f2', 'product_profiles_f3'],
  },
];

export default function Products() {
  const { t } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const productsAnimation = useScrollAnimation();

  return (
    <section className="bg-brand-bg text-white min-h-screen flex items-center py-16 2xl:py-24 px-4 relative overflow-hidden" id="products">
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center mb-14 2xl:mb-20 transition-all duration-1000 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-gray-500 text-sm 2xl:text-lg tracking-[0.2em] uppercase mb-4 2xl:mb-6 block">
            {t('products_header')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl font-bold text-white mb-4 2xl:mb-6">
            {t('products_title')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base 2xl:text-xl max-w-2xl 2xl:max-w-4xl mx-auto leading-relaxed">
            {t('products_subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div 
          ref={productsAnimation.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-12 transition-all duration-1000 delay-150 ${
            productsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-[#0B1222] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Product Image */}
              <div className="relative h-52 sm:h-56 2xl:h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={t(product.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222] via-[#0B1222]/40 to-transparent" />
              </div>

              {/* Product Content */}
              <div className="p-5 sm:p-6 2xl:p-10">
                <h3 className="text-lg sm:text-xl 2xl:text-3xl font-bold text-white mb-3 2xl:mb-5">
                  {t(product.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm 2xl:text-lg leading-relaxed mb-5 2xl:mb-7">
                  {t(product.descKey)}
                </p>

                {/* Features List */}
                <ul className="space-y-2 2xl:space-y-3">
                  {product.features.map((featureKey, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2.5 2xl:gap-3.5 text-sm 2xl:text-lg text-gray-300">
                      <span className="w-1.5 h-1.5 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {t(featureKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
