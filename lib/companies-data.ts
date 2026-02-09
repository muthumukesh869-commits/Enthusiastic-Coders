export interface Job {
    id: string;
    title: string;
    description: string;
    skills: string[];
    salary: string;
    type: string;
}

export interface Company {
    id: string;
    name: string;
    type: string;
    headquarters: string;
    rating: number;
    hiringRate: string;
    roles: string[];
    logo: string;
    color: string;
    description: string;
    about: string;
    jobs: Job[];
    benefits: string[];
    culture: string;
}

const companyNames = [
    "Google", "Apple", "Microsoft", "Amazon", "Meta", "Netflix", "Tesla", "NVIDIA", "Adobe", "Intel",
    "Salesforce", "Oracle", "IBM", "Cisco", "Qualcomm", "SpaceX", "Airbnb", "Uber", "Lyft", "Twitter",
    "Square", "Stripe", "Palantir", "Snowflake", "Databricks", "Atlassian", "Shopify", "Spotify", "Slack", "Zoom",
    "J.P. Morgan", "Goldman Sachs", "Morgan Stanley", "Visa", "Mastercard", "American Express", "PayPal", "Bank of America", "Citi", "Wells Fargo",
    "Nike", "Adidas", "Coca-Cola", "PepsiCo", "McDonald's", "Starbucks", "Walmart", "Target", "Costco", "Disney",
    "Samsung", "Sony", "Toyota", "Honda", "BMW", "Mercedes-Benz", "Volkswagen", "Ford", "General Motors", "Red Bull",
    "Accenture", "Deloitte", "PwC", "EY", "McKinsey", "BCG", "Bain & Company", "Kearney", "Oliver Wyman", "Infosys",
    "TCS", "Wipro", "HCL Tech", "Cognizant", "Capgemini", "L&T", "Reliance", "Tata Motors", "Mahindra", "ITC",
    "Samsung Electronics", "LG", "Huawei", "Xiaomi", "Tencent", "Alibaba", "ByteDance", "Baidu", "Meituan", "JD.com",
    "SAP", "Siemens", "Philips", "ASML", "Spotify", "Adyen", "Klarna", "Booking.com", "Delivery Hero", "Zalando",
    "Zomato", "Swiggy", "PhonePe", "Razorpay", "Ola", "Freshworks", "Zoho", "Postman", "Byju's", "Unacademy",
    "Flipkart", "Cred", "Dream11", "Nykaa", "Paytm", "InMobi", "BrowserStack", "Chargebee", "Gupshup", "Pine Labs"
];

const suffixes = ["Solutions", "Tech", "Systems", "Labs", "AI", "Infrastructure", "Global", "Networks", "Digital", "Dynamics", "Cloud", "Analytics", "Group", "Enterprises", "Consulting", "Ventures"];
const types = ["MNC", "Fortune 500", "Unicorn", "Startup", "MNC", "Fortune 500"]; // Balanced for priority
const locations = [
    "Mountain View, CA", "Cupertino, CA", "Redmond, WA", "Seattle, WA", "Menlo Park, CA", "San Francisco, CA", "Austin, TX",
    "Bengaluru, KA", "Hyderabad, TG", "Gurugram, HR", "Mumbai, MH", "Pune, MH", "New York, NY", "London, UK", "Berlin, DE",
    "Tokyo, JP", "Singapore", "Toronto, CA", "Dublin, IE", "Sydney, AU", "Boston, MA", "Chicago, IL", "Tel Aviv, IL"
];

const roleCategories = [
    ["Frontend Engineer", "UI Designer", "Product Designer", "User Researcher"],
    ["Backend Engineer", "DevOps Engineer", "Site Reliability Engineer", "Systems Architect"],
    ["Full Stack Developer", "QA Automation Engineer", "Mobile Developer (iOS/Android)"],
    ["Data Scientist", "ML Engineer", "Data Analyst", "Applied Scientist"],
    ["Product Manager", "Business Analyst", "Technical Program Manager", "Strategy Consultant"],
    ["Cybersecurity Analyst", "Security Engineer", "Network Architect", "Incident Responder"],
    ["Cloud Architect", "Solutions Engineer", "Technical Account Manager", "Developer Advocate"]
];

const colors = [
    "bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600",
    "bg-indigo-600", "bg-cyan-600", "bg-orange-600", "bg-fuchsia-600", "bg-teal-600"
];

const hiringRates = ["High", "Very High", "Selective", "Hyper-Growth", "Moderate", "Aggressive"];
const benefitsPool = [
    "Remote-First Work", "Comprehensive Health Insurance", "Stock Options (RSUs)", "Learning & Development Stipend",
    "Flexible Time Off", "Global Wellness Programs", "Commuter Benefits", "On-site Childcare", "Mental Health Support",
    "Performance Bonuses", "Home Office Setup Fund", "Paid Sabbaticals"
];

export const generateCompanies = (count: number): Company[] => {
    const generated: Company[] = [];

    for (let i = 0; i < count; i++) {
        const nameIdx = i % companyNames.length;
        const suffixIdx = (i * 127) % suffixes.length;
        const typeIdx = (i * 13) % types.length;
        const locIdx = (i * 23) % locations.length;
        const roleIdx = (i * 7) % roleCategories.length;
        const colorIdx = (i * 31) % colors.length;
        const hiringIdx = (i * 17) % hiringRates.length;

        const baseName = companyNames[nameIdx];
        // Ensure name uniqueness for 1000 companies using the index if we run out of base names
        const name = i < companyNames.length ? baseName : `${baseName} ${suffixes[suffixIdx]} ${Math.floor(i / companyNames.length)}`;

        const companyRoles = roleCategories[roleIdx];

        const companyJobs: Job[] = companyRoles.map((role, idx) => {
            const salaryBase = 120 + (i % 60) + (idx * 15);
            return {
                id: `job-${i}-${idx}`,
                title: role,
                description: `Join the team at ${name} as a ${role}. We are looking for individuals who can drive innovation in ${role.split(' ')[0]} and contribute to our global mission. You'll work on high-impact projects that reach millions of users.`,
                skills: [role.split(' ')[0], "System Design", "Cloud Architecture", "Agile Methodology", "Problem Solving"],
                salary: `$${salaryBase}k - $${salaryBase + 40}k`,
                type: idx % 3 === 0 ? "Remote" : "Hybrid"
            };
        });

        // Unique benefits per company
        const companyBenefits = [
            benefitsPool[(i * 3) % benefitsPool.length],
            benefitsPool[(i * 3 + 1) % benefitsPool.length],
            benefitsPool[(i * 3 + 2) % benefitsPool.length],
            benefitsPool[(i * 3 + 3) % benefitsPool.length]
        ];

        generated.push({
            id: `comp-${i}`,
            name,
            type: types[typeIdx],
            headquarters: locations[locIdx],
            rating: parseFloat((4.2 + ((i * 7) % 8) / 10).toFixed(1)), // Higher ratings for MNCs
            hiringRate: hiringRates[hiringIdx],
            roles: companyRoles,
            logo: name.charAt(0).toUpperCase(),
            color: colors[colorIdx],
            description: `A global leader in ${nameIdx < 10 ? 'Technology' : 'Innovation'}, ${name} is at the forefront of the digital revolution.`,
            about: `${name} is a multinational corporation specializing in ${nameIdx < 20 ? 'software, consumer electronics, and online services' : 'next-generation enterprise solutions'}. With operations in over 100 countries, we value diversity, creativity, and the relentless pursuit of excellence.`,
            jobs: companyJobs,
            benefits: companyBenefits,
            culture: "Focused on 'Growth Mindset' and 'Inclusion'. We encourage employees to take risks, learn from failures, and collaborate across borders to solve the world's toughest problems."
        });
    }

    return generated;
};

export const companiesData = generateCompanies(1000);
