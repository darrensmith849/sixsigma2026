export interface City {
  slug: string;
  name: string;
  province: string;
  shortIntro: string;
  body: string;
  /** Used as the LocalBusiness areaServed and address.addressLocality */
  locality: string;
  region: string;
}

export const cities: City[] = [
  {
    slug: "johannesburg",
    name: "Johannesburg",
    province: "Gauteng",
    locality: "Johannesburg",
    region: "Gauteng",
    shortIntro:
      "Internationally accredited Six Sigma training in the heart of South Africa\u2019s commercial capital.",
    body:
      "Johannesburg is home to more of South Africa\u2019s blue-chip corporates than any other city, and it is where we deliver the highest volume of Six Sigma training every year. Our Johannesburg programmes run year-round in central, easily accessible venues, and are also delivered on-site at client premises across Sandton, Rosebank, Midrand and the wider Gauteng region. Whether you are an individual booking onto a public Green Belt course or a quality manager rolling out an enterprise Lean transformation, our Johannesburg team can help.",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    province: "Western Cape",
    locality: "Cape Town",
    region: "Western Cape",
    shortIntro:
      "Lean Six Sigma training and certification across Cape Town and the wider Western Cape.",
    body:
      "Cape Town is our second-largest training base. We deliver classroom courses in central venues and on-site programmes at client premises across the Western Cape \u2014 from the V&A Waterfront and the CBD out to Bellville, Stellenbosch, Paarl and beyond. Our Cape Town courses are popular with the city\u2019s manufacturing, logistics, agri-processing, financial services and tech sectors, and every certificate is internationally accredited through CSSC USA.",
  },
  {
    slug: "durban",
    name: "Durban",
    province: "KwaZulu-Natal",
    locality: "Durban",
    region: "KwaZulu-Natal",
    shortIntro:
      "Six Sigma and Lean training in Durban, the gateway to KwaZulu-Natal.",
    body:
      "Durban is one of Africa\u2019s busiest port cities and a major hub for manufacturing, logistics, automotive, chemicals and agri-processing \u2014 sectors that benefit enormously from Six Sigma. We run regular public courses in central Durban venues and deliver tailored on-site programmes across KwaZulu-Natal, including Pinetown, Umhlanga, Pietermaritzburg and Richards Bay. Every programme leads to an internationally accredited CSSC certificate.",
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    province: "Gauteng",
    locality: "Pretoria",
    region: "Gauteng",
    shortIntro:
      "Six Sigma training for Pretoria\u2019s government, parastatal and corporate teams.",
    body:
      "Pretoria is the administrative capital of South Africa and home to many of our public-sector and parastatal clients. We deliver Six Sigma and Lean Management training at central Pretoria venues and on-site at government departments, SOEs and corporates across the city and the wider Tshwane region. Our Pretoria programmes are CSSC USA accredited and led by experienced Black Belts with public-sector experience.",
  },
  {
    slug: "port-elizabeth",
    name: "Port Elizabeth",
    province: "Eastern Cape",
    locality: "Gqeberha",
    region: "Eastern Cape",
    shortIntro:
      "Six Sigma training in Port Elizabeth (Gqeberha) and the wider Eastern Cape.",
    body:
      "Port Elizabeth (Gqeberha) is the centre of South Africa\u2019s automotive and manufacturing industry. The city hosts global plants and Tier-1 suppliers that rely on Six Sigma and Lean Manufacturing for their continuous improvement programmes. We deliver classroom training in central PE and on-site programmes across the Eastern Cape, including East London, Uitenhage and Coega. Every certificate is internationally accredited through CSSC USA.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
