import React from 'react'

import JobCategories from '../components/JobCategories'
import CarrierWork from '../components/CarrierWork'
import ChooseUs from '../components/ChooseUs'
import Testimonials from '../components/Testimonials'
import ImageSection from '../components/ImageSection'
// import Banner from '../components/Banner'
import AbroadBanner from '../components/AbroadBanner'
import AbroadCareerBanner from '../components/AbroadCareerBanner'
import FAQ from '../components/FAQ'
import GlobalJourneyBanner from '../components/GlobalJourneyBarnney'
import CareerJourneyBanner from '../components/CareerJourneyBanner'
import FlagSection from '../components/FlagSection'
import CompaniesHiringSection from '../components/CompaniesHiringSection'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>
      <AbroadBanner />
      <FlagSection />
      <CompaniesHiringSection />
      <JobCategories />
      <GlobalJourneyBanner />
      <CarrierWork />
      {/* <Banner /> */}
      <ImageSection />
      <ChooseUs />
      <CareerJourneyBanner />
      <Testimonials />
      <AbroadCareerBanner />
      <FAQ />
    </div>
  )
}

export default Home