export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface MockTest {
    id: string;
    title: string;
    topic: string;
    description: string;
    duration: number; // in minutes
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    questions: Question[];
    totalPoints: number;
}

const domains = [
    { name: 'Python', topics: ['Basics', 'Decorators', 'Pandas', 'Django', 'FastAPI', 'Algorithms'] },
    { name: 'Java', topics: ['OOPs', 'Collections', 'Spring Boot', 'Multithreading', 'JVM', 'Microservices'] },
    { name: 'Frontend', topics: ['React Hooks', 'Next.js', 'Tailwind', 'TypeScript', 'Redux', 'WebGL'] },
    { name: 'Backend', topics: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'] },
    { name: 'Database', topics: ['SQL Basics', 'Normalization', 'Indexing', 'NoSQL', 'MongoDB', 'Query Optimization'] },
    { name: 'Cloud', topics: ['AWS S3', 'Azure Functions', 'GCP Compute', 'Kubernetes', 'Serverless', 'Terraform'] },
    { name: 'Cybersecurity', topics: ['Ethical Hacking', 'Cryptography', 'Network Security', 'OWASP Top 10', 'Pen-testing'] },
    { name: 'Mobile', topics: ['React Native', 'Flutter', 'SwiftUI', 'Kotlin', 'Firebase', 'Native Modules'] },
    { name: 'DevOps', topics: ['CI/CD', 'Jenkins', 'Ansible', 'GitOps', 'Monitoring', 'Logging'] },
    { name: 'AI/ML', topics: ['Neural Networks', 'NLP', 'Computer Vision', 'PyTorch', 'Scikit-Learn', 'Feature Engineering'] }
];

const questionTemplates = [
    {
        q: "What is the primary use of {topic} in {domain}?",
        o: ["Hardware Management", "Efficient Data Processing", "UI Styling Only", "Network Routing"],
        a: 1,
        e: "{topic} is fundamental to {domain} because it enables efficient data processing and logical flow."
    },
    {
        q: "Which of these is a BEST practice when working with {topic}?",
        o: ["Ignoring errors", "Continuous testing", "Hardcoding values", "Avoiding documentation"],
        a: 1,
        e: "In {domain}, continuous testing is essential for maintaining high-quality {topic} implementations."
    },
    {
        q: "How does {topic} improve the performance of a {domain} application?",
        o: ["By increasing latency", "By optimizing resource usage", "By slowing down the CPU", "By doubling the code size"],
        a: 1,
        e: "Resource optimization is key to {topic}'s role in building performant {domain} systems."
    },
    {
        q: "In the context of {domain}, which tool is most commonly used for {topic}?",
        o: ["A text editor", "A specialized IDE/CLI", "A calculator", "A mechanical switch"],
        a: 1,
        e: "Specialized tools are standard for {topic} to ensure {domain} standards are met."
    },
    {
        q: "What is the complexity of a typical {topic} operation in a {domain} environment?",
        o: ["Exponential", "Logarithmic or Linear", "Infinite", "Always constant"],
        a: 1,
        e: "Linear or Logarithmic complexity is usually preferred for {topic} in high-scale {domain} projects."
    }
];

export const generateMockTests = (count: number): MockTest[] => {
    const tests: MockTest[] = [];

    for (let i = 0; i < count; i++) {
        const domain = domains[i % domains.length];
        const topic = domain.topics[(i * 3) % domain.topics.length];
        const difficulty: 'Beginner' | 'Intermediate' | 'Advanced' =
            i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced';

        const questions: Question[] = questionTemplates.map((template, idx) => ({
            id: `q-${i}-${idx}`,
            question: template.q.replace('{topic}', topic).replace('{domain}', domain.name),
            options: template.o,
            correctAnswer: template.a,
            explanation: template.e.replace('{topic}', topic).replace('{domain}', domain.name)
        }));

        tests.push({
            id: `test-${i}`,
            title: `${topic} Masterclass`,
            topic: domain.name,
            description: `Excellence in ${topic} for professional ${domain.name} developers. This test covers advanced patterns and architecture.`,
            duration: 10 + (i % 21), // 10 to 30 mins
            difficulty,
            questions,
            totalPoints: 100
        });
    }

    return tests;
};

export const mockTests: MockTest[] = generateMockTests(100);
