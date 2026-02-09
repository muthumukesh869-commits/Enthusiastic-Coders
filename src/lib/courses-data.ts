export interface Lesson {
    id: string;
    title: string;
    duration: string;
    youtubeId: string;
}

export interface Course {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    lessons: Lesson[];
    description: string;
}

const courseTemplates = [
    { title: 'Python for Beginners', instructor: 'Programming with Mosh', youtubeId: 'kqtD5dpn9C8', category: 'Python' },
    { title: 'Java Complete Course', instructor: 'freeCodeCamp', youtubeId: 'A74ToW81Jqc', category: 'Java' },
    { title: 'C Programming Mastery', instructor: 'freeCodeCamp', youtubeId: 'KJgsSF67lDU', category: 'C' },
    { title: 'Learn C++ in 10 Hours', instructor: 'freeCodeCamp', youtubeId: 'vLnPwxZdW4Y', category: 'C++' },
    { title: 'JavaScript Essentials', instructor: 'Programming with Mosh', youtubeId: 'W6NZ1pN5B4w', category: 'Frontend' },
    { title: 'React Full Course 2024', instructor: 'freeCodeCamp', youtubeId: 'bMknfKXIFA8', category: 'Frontend' },
    { title: 'MERN Stack Social App', instructor: 'JS Mastery', youtubeId: '7CqJlxBYj-M', category: 'Fullstack' },
    { title: 'SQL Full Course', instructor: 'Programming with Mosh', youtubeId: 'HXV3zeQHqGY', category: 'SQL' },
    { title: 'Node.js Full Tutorial', instructor: 'freeCodeCamp', youtubeId: 'Oe421EPjeBE', category: 'Backend' },
    { title: 'AWS Cloud Practitioner', instructor: 'freeCodeCamp', youtubeId: 'SOTamWNgDKc', category: 'Cloud' }
];

const backupIds = ['zId7N7Z-p80', 'hdI2bqOjy3c', '7S_zhMmesqE', 'u-OmNv_w8U4', 'VAdGW7ocX_k'];

const descriptions = [
    "Perfect for beginners looking to build a strong foundation in professional development.",
    "Master advanced patterns and industry-standard practices with this comprehensive guide.",
    "Build real-world projects that you can add to your portfolio and show to recruiters.",
    "A deep dive into internal mechanics and optimization techniques for high-scale apps.",
    "Learn the latest features and updates in the tech ecosystem with hands-on labs."
];

export const generateCourses = (count: number): Course[] => {
    const generated: Course[] = [];

    for (let i = 0; i < count; i++) {
        const template = courseTemplates[i % courseTemplates.length];
        const desc = descriptions[i % descriptions.length];
        const level: 'Beginner' | 'Intermediate' | 'Advanced' =
            i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced';

        const titleSuffix = i < courseTemplates.length ? '' : ` (Advanced Track ${Math.floor(i / courseTemplates.length) + 1})`;

        const finalYoutubeId = (i % 5 === 0 && i >= courseTemplates.length)
            ? backupIds[i % backupIds.length]
            : template.youtubeId;

        generated.push({
            id: `course-${i}`,
            title: `${template.title}${titleSuffix}`,
            instructor: template.instructor,
            thumbnail: `https://img.youtube.com/vi/${finalYoutubeId}/maxresdefault.jpg`,
            category: template.category,
            level,
            description: desc,
            lessons: [
                {
                    id: `l-${i}-1`,
                    title: `Introduction to ${template.category}`,
                    duration: `${15 + (i % 5)}:00`,
                    youtubeId: finalYoutubeId
                },
                {
                    id: `l-${i}-2`,
                    title: `Advanced ${template.category} Patterns`,
                    duration: `${25 + (i % 10)}:00`,
                    youtubeId: finalYoutubeId
                },
                {
                    id: `l-${i}-3`,
                    title: `${template.category} Professional Build`,
                    duration: `${50 + (i % 30)}:00`,
                    youtubeId: finalYoutubeId
                }
            ]
        });
    }

    return generated;
};

export const courses: Course[] = generateCourses(100);
