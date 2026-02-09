import { NextRequest, NextResponse } from 'next/server';
import { ResumeAnalysis } from '@/types/api';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Save file to temporary location
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tempDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const filename = `${uuidv4()}-${file.name}`;
        const filepath = path.join(tempDir, filename);
        fs.writeFileSync(filepath, buffer);

        // Call Python script
        const pythonScript = path.join(process.cwd(), 'scripts', 'resume_analyzer.py');
        const results = await new Promise<any>((resolve, reject) => {
            const pythonProcess = spawn('python', [pythonScript, filepath]);
            let output = '';
            let error = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                error += data.toString();
            });

            pythonProcess.on('close', (code) => {
                // Cleanup temp file immediately after process closes
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }

                if (code !== 0) {
                    reject(new Error(`Python process exited with code ${code}: ${error}`));
                    return;
                }
                try {
                    const parsed = JSON.parse(output.trim());
                    if (parsed.error) {
                        reject(new Error(parsed.error));
                    } else {
                        resolve(parsed);
                    }
                } catch (e) {
                    reject(new Error(`Failed to parse Python output: ${output}`));
                }
            });
        });

        const analysis: ResumeAnalysis = {
            score: results.score,
            status: results.score > 85 ? 'Excellent' : results.score > 70 ? 'Strong' : results.score > 50 ? 'Average' : 'Weak',
            missingKeywords: results.missing,
            recommendations: [
                { title: "Skill Gap Analysis", text: `Your resume is missing the following key skills: ${results.missing.slice(0, 3).join(', ')}.` },
                { title: "Matched Potential", text: `You have successfully matched ${results.matched.length} key skills from the job description.` },
                { title: "Contact Info Status", text: `Email: ${results.email}, Phone: ${results.phone}` }
            ],
            idealStructure: [
                { section: "Header", points: ["Professional Email", "LinkedIn Profile", "Portfolio Link", "Phone Number"] },
                { section: "Professional Summary", points: ["2-3 sentences highlighting core expertise", "Mention years of experience", "Key tech stack emphasis"] },
                { section: "Technical Skills", points: ["Categorized by (Languages, Frameworks, Tools)", "Include all matched keywords: " + results.matched.slice(0, 5).join(', ')] },
                { section: "Work Experience", points: ["Action-oriented bullet points (Built, Led, Developed)", "Quantifiable results (Improved performance by 20%)", "Relevant tech stack for each role"] },
                { section: "Projects", points: ["Personal or Open Source contributions", "Links to GitHub/Live Demo", "Description of challenges solved"] }
            ],
            improvements: [
                {
                    title: "Keyword Optimization",
                    description: `Integrate missing keywords: ${results.missing.slice(0, 5).join(', ')} naturally into your experience section.`,
                    priority: "High"
                },
                {
                    title: "Quantifiable Impact",
                    description: "Add metrics to your achievements. Use percentages or numbers to show the scale of your work.",
                    priority: "High"
                },
                {
                    title: "Formatting & ATS",
                    description: results.score < 70 ? "Your current structure might be difficult for ATS to parse. Stick to a clean, single-column layout." : "Structure looks good, but ensure consistent font sizes and spacing.",
                    priority: results.score < 70 ? "High" : "Medium"
                },
                {
                    title: "Contact Information",
                    description: results.email === 'Not found' ? "Missing primary contact email. This is critical for recruiters." : "Ensure your LinkedIn and Portfolio links are clickable and up to date.",
                    priority: results.email === 'Not found' ? "High" : "Low"
                }
            ],
            breakdown: {
                foundations: [
                    { name: 'Email Found', status: results.email !== 'Not found' ? 'completed' : 'warning' },
                    { name: 'Phone Found', status: results.phone !== 'Not found' ? 'completed' : 'warning' },
                    { name: 'Skills Extraction', status: results.matched.length > 0 ? 'completed' : 'pending' }
                ],
                contentDepth: [
                    { name: 'Technical Depth', status: results.score > 60 ? 'completed' : 'warning' },
                    { name: 'Role Match', status: results.score > 75 ? 'completed' : 'pending' },
                    { name: 'Keyword Density', status: results.matched.length > 5 ? 'completed' : 'warning' }
                ]
            }
        };

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: 'Failed to analyze resume: ' + error.message }, { status: 500 });
    }
}
