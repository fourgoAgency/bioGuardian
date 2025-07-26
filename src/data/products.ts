import { Product } from '@/components/products/ProductCard';

export const products: Product[] = [
  {
    id: 'agnus',
    name: 'Agnus',
    category: 'Infertility',
    type: 'Nutraceutical Supplement',
    composition: 'Vitex Agnus Castus, Ginkgo Biloba, Calcium, Zinc, Vitamin D3, Vitamin B6, Magnesium',
    form: 'Tablet',
    indication: 'Hyperprolactinemia, PMS, PMDD',
    price: 1888,
    mainImage: '/lovable-uploads/d332d787-bed0-4a54-847b-2b3c265ec2b7.png',
    images: [
      '/Agnus High Res-01.png',
      '/Agnus High Res-02.png',
      '/Agnus High Res-03.png',
      '/Agnus High Res-04.png',
      '/Agnus High Res-05.png'
    ],
    color: 'from-[#8b2a6b] to-[#7a2459]',
    description: `
      Agnus is a nutraceutical supplement formulated to support hormonal balance in women. It targets hyperprolactinemia, PMS, and PMDD—helping regulate prolactin, ease cramps, and improve mood.
    `,
    dosage: '1–2 tablets daily, preferably at the same time each day. Use for at least 3 cycles for best results.',
    ingredients: [
      { name: 'Vitex agnus-castus', benefit: 'Balances female hormones by lowering prolactin.' },
      { name: 'Ginkgo biloba', benefit: 'Improves blood flow and supports mental clarity.' },
      { name: 'Calcium', benefit: 'Reduces cramps, supports muscle function.' },
      { name: 'Zinc', benefit: 'Boosts immunity and hormonal balance.' },
      { name: 'Vitamin D3', benefit: 'Supports calcium absorption and hormonal mood regulation.' },
      { name: 'Vitamin B6', benefit: 'Reduces PMS-related mood swings.' },
      { name: 'Magnesium', benefit: 'Eases fatigue and menstrual cramps.' }
    ],
    faqs: [
      {
        q: 'What is Agnus used for?',
        a: 'For hormonal imbalance, PMS, PMDD, and high prolactin-related symptoms.'
      },
      {
        q: 'How does Agnus work?',
        a: 'It lowers prolactin via Vitex and supports hormones and mood with other nutrients.'
      },
      {
        q: 'What is the recommended dosage of Agnus?',
        a: 'Take 1–2 tablets daily. Consistency is key for best results.'
      },
      {
        q: 'How long should I take Agnus?',
        a: 'Minimum of 3 cycles recommended to see full effects.'
      },
      {
        q: 'Does Agnus help regulate periods?',
        a: 'Yes, it helps restore menstrual cycle by correcting prolactin imbalance.'
      },
      {
        q: 'Is it safe with other medications?',
        a: 'Usually safe, but consult your doctor for drug interactions.'
      },
      {
        q: 'Are there any side effects?',
        a: 'Some may experience mild nausea or headache. Stop if symptoms persist.'
      },
      {
        q: 'Can I take Agnus while pregnant or breastfeeding?',
        a: 'No. Not recommended during pregnancy or lactation.'
      },
      {
        q: 'Is it a hormonal medicine?',
        a: 'No, it’s a plant-based natural supplement.'
      },
      {
        q: 'Can teenagers use Agnus?',
        a: 'Yes, under medical supervision for PMS relief.'
      },
      {
        q: 'Is Agnus safe for long-term use?',
        a: 'Yes, under regular healthcare guidance.'
      },
      {
        q: 'Where can I buy Agnus?',
        a: 'From pharmacies or verified online nutraceutical stores.'
      }
    ]
  },
  {
    id: 'sliczole',
    name: 'Sliczole',
    category: 'Infertility / Ovulation Induction',
    composition: 'Letrozole 2.5 mg',
    form: 'Tablet',
    indication: 'Anovulation, PCOS-related infertility, Ovulatory dysfunction',
    price: 6000,
    type: 'Prescription Medication',
    mainImage: '/lovable-uploads/54590e95-2b72-422f-8bf3-60cfa9d25589.png',
    images: [
      '/Sliczole-1.png',
      '/Sliczole-2.png',
      '/Sliczole-3.png',
      '/Sliczole-4.png',
      '/Sliczole-5.png',
      '/Sliczole-6.png'
    ],
    color: 'from-[#025a8a] to-[#024b75]',
    description: `
      Sliczole is a prescription medication containing Letrozole 2.5 mg, a third-generation aromatase inhibitor.
      It is used primarily in female infertility treatment to induce ovulation, especially in women with PCOS or anovulatory cycles.
      Compared to Clomiphene, it has better success rates and fewer side effects.
    `,
    dosage: `
      • 2.5 mg once daily for 5 consecutive days (typically from Day 3 of the cycle).
      • Maximum dose: Up to 10 mg/day if advised by a doctor.
      • Always use under medical supervision.
    `,
    ingredients: [
      {
        name: 'Letrozole',
        benefit: 'Aromatase inhibitor that reduces estrogen levels and induces ovulation in women with ovulatory dysfunction.'
      }
    ],
    faqs: [
      {
        q: 'What is Sliczole used for?',
        a: 'To stimulate ovulation in women with PCOS or ovulatory dysfunction.'
      },
      {
        q: 'How does Sliczole (Letrozole) help in infertility?',
        a: 'It lowers estrogen, prompting the pituitary gland to release FSH to trigger ovulation.'
      },
      {
        q: 'How is Sliczole different from Clomiphene?',
        a: 'Higher success rate in PCOS, lower multiple pregnancy risk, fewer side effects.'
      },
      {
        q: 'What is the typical dosage of Sliczole?',
        a: '2.5 mg daily for 5 days, starting on Day 3 of the menstrual cycle.'
      },
      {
        q: 'Can Sliczole be used in natural cycles?',
        a: 'Yes. It’s used to induce ovulation even without other medications.'
      },
      {
        q: 'Are there any side effects of Sliczole?',
        a: 'Headache, fatigue, dizziness, hot flashes, mild abdominal discomfort.'
      },
      {
        q: 'Is Sliczole safe for long-term use?',
        a: 'No. Used for limited cycles only under doctor supervision.'
      },
      {
        q: 'Can Sliczole increase the chance of twins?',
        a: 'Yes, but less than Clomiphene—about 5–10% chance.'
      },
      {
        q: 'Can Sliczole be used in women without PCOS?',
        a: 'Yes, for unexplained infertility or assisted reproduction protocols.'
      },
      {
        q: 'Is a prescription required for Sliczole?',
        a: 'Yes. It must be prescribed and monitored by a specialist.'
      },
      {
        q: 'Can it be used with other fertility treatments?',
        a: 'Yes. Often used with IUI, IVF, or trigger shots.'
      },
      {
        q: 'Can it be taken during pregnancy or breastfeeding?',
        a: 'No. It’s contraindicated in pregnancy and lactation.'
      }
    ]
  },
  {
    id: 'insotek',
    name: 'Insotek',
    category: 'Women’s Health / PCOS Management',
    composition: 'Myo-inositol, D-chiro inositol, L-methyl folate, Vitamin D3',
    form: 'Oral Sachet',
    type: 'Nutraceutical Supplement',
    indication: 'PCOS, Acne & Hirsutism, Menstrual irregularities, Gestational diabetes',
    price: 4307,
    mainImage: '/lovable-uploads/9375a038-e9b9-4a82-b94c-e829cb7e8126.png',
    images: [
      '/insotek-1.png',
      '/insotek-2.png',
      '/insotek-3.png',
      '/insotek-4.png',
      '/insotek-5.png',
      '/insotek-6.png'
    ],
    color: 'from-orange-500 to-orange-600',
    description: `
      Insotek is a science‑based nutraceutical sachet designed for comprehensive PCOS management.
      It synergistically combines Myo‑inositol, D‑chiro inositol, L‑methyl folate, and Vitamin D3
      to improve insulin sensitivity, hormonal balance, and reproductive health.
    `,
    dosage: 'Take 1 sachet daily in water on an empty stomach. Use continuously for 3–6 months as advised.',
    ingredients: [
      {
        name: 'Myo-inositol',
        benefit: 'Improves insulin sensitivity, restores ovulation, and regulates menstrual cycles.'
      },
      {
        name: 'D-chiro inositol',
        benefit: 'Enhances metabolic and hormonal balance; supports ovarian function.'
      },
      {
        name: 'L-methyl folate',
        benefit: 'Active folate form that supports cellular methylation and embryonic development.'
      },
      {
        name: 'Vitamin D3',
        benefit: 'Regulates hormones, insulin metabolism, and supports immune & reproductive health.'
      }
    ],
    faqs: [
      {
        q: 'What is Insotek used for?',
        a: 'Managing PCOS, acne, hirsutism, menstrual irregularities, and gestational diabetes by improving hormonal & metabolic balance.'
      },
      {
        q: 'How does Insotek help in PCOS?',
        a: 'Myo‑inositol and D‑chiro inositol work together to improve insulin sensitivity, restore ovulation, and reduce androgenic symptoms.'
      },
      {
        q: 'Is Insotek effective for acne and facial hair?',
        a: 'Yes. By lowering androgen levels, it helps reduce acne and unwanted hair growth in PCOS.'
      },
      {
        q: 'Can Insotek regulate irregular periods?',
        a: 'Regular use helps restore ovulatory cycles and normalize menstrual periods.'
      },
      {
        q: 'How does Insotek support gestational diabetes?',
        a: 'Improves insulin metabolism and reduces resistance, supporting glycemic control in pregnancy.'
      },
      {
        q: 'What is the recommended dosage of Insotek?',
        a: 'One sachet daily in the morning on an empty stomach. Dissolve in water and consume immediately.'
      },
      {
        q: 'Is Insotek safe during pregnancy?',
        a: 'Yes, its ingredients are safe and may support early pregnancy, but always consult your doctor first.'
      },
      {
        q: 'Can Insotek be used with other fertility treatments?',
        a: 'Yes, but discuss combinations with your healthcare provider for best protocols.'
      },
      {
        q: 'Does Insotek cause side effects?',
        a: 'Generally well‑tolerated; occasional mild bloating or nausea may occur.'
      },
      {
        q: 'How long to see results with Insotek?',
        a: 'Results often start in 4–6 weeks; optimal benefits seen after 3–6 months of regular use.'
      },
      {
        q: 'Is Insotek suitable for all PCOS women?',
        a: 'Yes, including those with insulin resistance or fertility issues, under medical guidance.'
      },
      {
        q: 'Where can I buy Insotek?',
        a: 'Available at pharmacies, nutraceutical outlets, and verified online healthcare platforms.'
      }
    ]
  },
  {
    id: 'funzil',
    name: 'Funzil',
    category: 'Antifungal Therapy / Women’s Health',
    type: 'Antifungal Medication',
    composition: 'Fluconazole 150 mg',
    form: 'Oral Capsule',
    indication: 'Mucosal, vaginal, systemic fungal infections, and prophylaxis in immunocompromised patients',
    price: 198,
    mainImage: '/lovable-uploads/ba33e426-f70b-4778-a6b8-f4859c836f02.png',
    images: [
      '/lovable-uploads/ba33e426-f70b-4778-a6b8-f4859c836f02.png',
      '/funzil-02.png',
      '/funzil-03.png',
      '/funzil-04.png'
    ],
    color: 'from-[#2a6ca8] to-[#245a92]',
    description: `
    Funzil is a triazole-class antifungal capsule formulated to combat a wide range of fungal infections by inhibiting fungal cytochrome P-450 enzymes. 
    This interference in ergosterol synthesis weakens fungal cell membranes, making Funzil highly effective for treating mucosal, systemic, and vaginal candidiasis, including recurrent and chronic cases.
  `,
    dosage: `
    • Oropharyngeal Candidiasis: 50–100 mg daily for 7–14 days  
    • Esophageal Candidiasis: 50–100 mg daily for 14–30 days  
    • Vaginal Candidiasis (Acute): 150 mg single dose  
    • Vaginal Candidiasis (Recurrent): 150 mg on day 1, day 4, day 7, then weekly for 6 months  
    • Cryptococcal Meningitis (Acute): 400 mg initially, then 200–400 mg daily  
    • Cryptococcal Meningitis (Relapse Prevention): 100–200 mg daily  
    • Prophylaxis in Immunocompromised: 50–100 mg daily  
    • Dermal Infections: 150 mg weekly or 50 mg daily for 2–6 weeks (300 mg weekly for tinea versicolor)  
    • Deep Endemic Mycoses: 200–400 mg daily for up to 2 years  
    ⚠ Always follow physician-recommended dosage.
  `,
    ingredients: [
      {
        name: 'Fluconazole',
        benefit: 'Triazole antifungal that inhibits fungal cytochrome P-450, disrupting cell membrane synthesis.'
      }
    ],
    faqs: [
      {
        q: 'What is Funzil used for?',
        a: 'Funzil treats fungal infections like vaginal candidiasis, oral thrush, and cryptococcal meningitis. It’s also used for prophylaxis in immunocompromised patients.'
      },
      {
        q: 'How quickly does Funzil work?',
        a: 'Relief in mild infections like vaginal candidiasis is often noticed within 24–48 hours. Severe infections may take days to weeks.'
      },
      {
        q: 'Is Funzil safe in pregnancy or breastfeeding?',
        a: 'Use with caution and only under medical advice. Animal studies show some risk; human data is limited.'
      },
      {
        q: 'Can Funzil be used in children?',
        a: 'Not routinely. It should be used only if prescribed by a pediatrician.'
      },
      {
        q: 'Does Funzil require a prescription?',
        a: 'Yes. Funzil is a prescription-only antifungal medicine.'
      },
      {
        q: 'Can I take Funzil with food?',
        a: 'Yes. Funzil can be taken with or without food, though it’s often taken on an empty stomach for faster absorption.'
      },
      {
        q: 'Is a single dose enough for vaginal candidiasis?',
        a: 'Yes, a 150 mg single dose is effective for uncomplicated cases.'
      },
      {
        q: 'What should I do if I miss a dose?',
        a: 'Take it as soon as you remember unless it\'s almost time for the next dose. Do not double-dose.'
      }
    ]
  }
]
