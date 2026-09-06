/*
 * Portfolio content.
 *
 * Everything the site displays is defined here as data; js/render.js turns it
 * into DOM. A new project, job or window is one entry in one of these lists.
 */


/* Icon lookup. A name that isn't listed renders as a text chip instead. */
const TECH = {
    /* Languages */
    'C++':         'images/C++.png',
    'Python':      'images/Python.png',
    'C#':          'images/csharp.png',
    'HTML':        'images/HTML.png',
    'CSS':         'images/CSS.png',
    'JavaScript':  'images/js.png',
    'Java':        'images/java.png',
    'SQL':         'images/SQL.png',

    /* Frameworks */
    'Spring Boot': 'images/springboot.png',
    'React':       'images/react.png',
    'Node':        'images/nodejs.png',
    'Flask':       'images/flask.png',

    /* Tools & infrastructure */
    'Git':         'images/git.png',
    'Maven':       'images/maven.png',
    'Docker':      'images/docker.png',
    'Kubernetes':  'images/kubernetes.png',
    'Kafka':       'images/kafka.png',

    /* Cloud */
    'AWS':         'images/aws.png',
    'Azure':       'images/microsoft_azure.png',

    /* Databases */
    'PostgreSQL':  'images/postgresql.png',
    'MySQL':       'images/mysql.png',

    /* Data & other */
    'Pandas':      'images/pandas.png',
    'NumPy':       'images/numpy.png',
    'OpenCV':      'images/opencv.png',
    'Unity':       'images/unity.png',
    'VS Code':     'images/vscode.png'
};


const PROFILE = {
    name: 'Phi Tran',
    avatar: 'images/me.jpg',
    boot: {
        prompt: "Click on Phi's Computer!",
        loading: 'Portfolio Loading...',
        welcome: 'Welcome!'
    },
    socials: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pntran25/', icon: 'images/linkedin.png' },
        { label: 'GitHub',   href: 'https://github.com/pntran25',           icon: 'images/github.png' }
    ]
};


/* The face behind the desktop icons, and what it says on hover. */
const MASCOT = {
    idle: 'images/faceclosed.png',
    messages: [
        "Welcome to Phi's portfolio!",
        'Check out my projects!',
        'Feel free to contact me!',
        "Hope you're having a great time!",
        'At the bottom right of the windows, you can resize them!',
        'I looove basketball!',
        "I'm a big fan of R&B, Indie, Rap, and Rock music!",
        'I play electric guitar!',
        "I can't wait to learn more in my Computer Science journey!",
        'Phi is a cool guy!',
        'Currently coding...',
        "Make sure to click the icons to see what's up!"
    ]
};


/*
 * One entry per window: `id` names both the window and its desktop icon,
 * `type` picks a layout from js/render.js, and `status` overrides the
 * generated status-bar text. List order is desktop-icon order.
 */
const PORTFOLIO = {
    profile: PROFILE,
    mascot: MASCOT,
    tech: TECH,
    windows: [

    /* About */
    {
        id: 'about',
        label: 'About',
        title: 'About Me',
        icon: 'images/aboutme.png',
        type: 'about',
        status: 'Ready',

        photo: 'images/me.jpg',
        name: 'Phi Tran',
        headline: 'Aspiring Cybersecurity Analyst and Software Engineer',

        intro: "Hi! I'm Phi Tran, a Computer Science junior at the University of Houston focused on cybersecurity. This past summer I worked as a Cybersecurity Intern at NRG Energy, where I monitored and triaged security alerts across Linux and cloud environments, ran vulnerability assessments, and built AI-assisted log-parsing tooling that cut manual analysis time by 90%. I'm studying for my CompTIA Security+ and I teach databases as a TA. What I like most is where security meets engineering — writing the tooling that makes threats easier to catch. Feel free to contact me!",

        education: {
            logo: 'images/uh.png',
            school: 'University of Houston',
            degree: 'Bachelor of Science, Computer Science',
            note: 'Expected May 2028',
            bullets: [
                'Major in Computer Science',
                'GPA 3.9/4.0'
            ]
        },

        facts: {
            heading: 'System Properties',
            rows: [
                { label: 'Studying',     value: 'CompTIA Security+ — exam Winter 2026' },
                { label: 'Teaching',     value: 'Databases TA at the University of Houston' },
                { label: 'Building',     value: 'Sonny — an indie-thriller game in Unity' },
                { label: 'Plays',        value: 'Electric guitar' },
                { label: 'Sports',       value: 'Basketball, bowling, table tennis, pickleball' },
                { label: 'Preferred UI', value: 'Windows 95 (you may have noticed)' }
            ]
        },

        // Typed out one character at a time by js/terminal.js.
        terminal: {
            label: 'MS-DOS Prompt',
            prompt: 'C:\\PHI>',
            typeSpeed: 55,        // ms per character
            lines: [
                {
                    command: 'whoami',
                    output: ['phi.tran  --  cybersecurity + software engineering']
                },
                {
                    command: 'ver',
                    output: [
                        'University of Houston, B.S. Computer Science',
                        'Expected May 2028   GPA 3.9'
                    ]
                },
                {
                    command: 'tasklist',
                    output: [
                        'security+.exe    studying    exam Winter 2026',
                        'databases.ta     running     University of Houston',
                        'sonny.unity      running     indie-thriller game'
                    ]
                },
                {
                    command: 'echo %INTERESTS%',
                    output: ['guitar, basketball, and very old user interfaces']
                }
            ]
        },

        nowPlaying: {
            label: 'PHI.FM',
            marquee: 'R&B ✦ Indie ✦ Rap ✦ Rock ✦ and a lot of electric guitar',
            bars: 28
        }
    },

    /* Skills */
    {
        id: 'skills',
        label: 'Skills',
        title: 'Skills',
        icon: 'images/competencies.png',
        type: 'skills',

        groups: [
            {
                name: 'Security & Compliance',
                items: ['Vulnerability Assessment', 'Security Incident Response',
                        'Risk Management', 'NIST Compliance', 'Privacy/Regulatory Compliance',
                        'Linux', 'Splunk', 'SQL/LEQL Log Analysis']
            },
            {
                name: 'Programming Languages',
                items: ['Python', 'Java', 'C++', 'C#', 'SQL', 'JavaScript', 'HTML', 'CSS']
            },
            {
                name: 'Tools & Technologies',
                items: ['Spring Boot', 'AWS', 'Azure', 'Flask', 'React', 'Node', 'Git',
                        'Docker', 'Kafka', 'Kubernetes', 'Maven', 'Pandas', 'NumPy']
            }
        ]
    },

    /* Experience */
    {
        id: 'experience',
        label: 'Experience',
        title: 'Experience',
        icon: 'images/experience.svg',
        type: 'experience',

        // Newest first: the timeline renders top to bottom.
        jobs: [
            {
                role: 'Databases Teaching Assistant',
                company: 'University of Houston',
                date: 'Aug 2026 – Present',
                bullets: [
                    'Teach and assist 50+ students in relational database design, SQL query writing, normalization, and transaction management',
                    'Hold weekly office hours and grade assignments to reinforce core RDBMS concepts'
                ]
            },
            {
                role: 'Cybersecurity Intern',
                company: 'NRG Energy',
                date: 'May 2026 – Aug 2026',
                bullets: [
                    'Monitored, triaged, and responded to security alerts across Linux and cloud environments, querying logs with SQL/LEQL to investigate threats and reduce mean time to detection',
                    'Integrated AI/LLM-based classification into Python and Java log-parsing tooling, automatically triaging and enriching threat-intelligence signals to cut manual analysis time by 90% for recurring investigations',
                    'Conducted vulnerability assessments and assisted with remediation tracking, identifying and documenting 50+ findings across internal applications and Linux infrastructure',
                    'Partnered with engineering and business stakeholders to translate technology and data risks into business impact, guiding remediation and improving NIST compliance'
                ]
            },
            {
                role: 'Software Engineer Intern',
                company: 'Energy AI Solutions',
                date: 'Jan 2026 – May 2026',
                bullets: [
                    'Collaborated with a 5+ member cross-functional team to design and develop an AI-powered coaching application supporting 100+ tech students with personalized career guidance',
                    'Integrated LLM API calls into full-stack features built with React.js, Flask, and MySQL, streaming AI-generated coaching guidance in real time and improving data retrieval efficiency by 30%',
                    'Developed backend APIs in Python to support AI-driven recommendations, user profiling, and progress tracking, processing 1,000+ user data points securely in the cloud',
                    'Deployed and managed application components using Azure cloud services and Blob storage, orchestrating data workflows with Azure Data Factory to ensure 99% uptime'
                ]
            },
            {
                role: 'Data Structures Teaching Assistant',
                company: 'University of Houston',
                date: 'Jan 2026 – May 2026',
                bullets: [
                    'Taught and assisted with implementing core data structures in C++ — pointers, memory management, recursion, STL, and Big-O analysis',
                    'Reviewed and debugged student code, held office hours, and mentored students one-on-one'
                ]
            },
            {
                role: 'Team Director',
                company: 'Code Coogs',
                date: 'Aug 2024 – Dec 2025',
                bullets: [
                    'Managed 10+ software development workshops covering 40+ hours of Python and C++ instruction',
                    'Led a 12+ member game development team, tutoring members in Unity and C# — awarded 2nd Place, Best Team'
                ]
            }
        ]
    },

    /* Projects */
    {
        id: 'projects',
        label: 'Projects',
        title: 'Projects',
        icon: 'images/projects.png',
        type: 'projects',

        projects: [
            {
                title: 'Codexa — Coding Platform',
                tech: ['Java', 'Spring Boot', 'Maven', 'PostgreSQL', 'AWS', 'React'],
                date: 'May 2025 – Jun 2026',
                description: 'Developed a full-stack coding platform using Java (Spring Boot) and PostgreSQL, designing REST APIs and SQL queries to support code problem retrieval and user submissions, resulting in a 35% improvement in data access speed. Deployed to AWS EC2 and RDS with CI/CD pipelines that maintained 99.9% service uptime, and integrated the backend with a React frontend handling authentication, state, and routing for 100+ users.',
                image: 'images/codexa.png',
                href: 'https://github.com/pntran25/codeplatform',
                linkLabel: 'GitHub'
            },
            {
                title: 'Zootabase — Zoo Management Platform',
                tech: ['React', 'Node', 'Express.js', 'Azure'],
                date: 'Feb 2026 – Apr 2026',
                description: 'Full stack development for a mock zoo that lets visitors and staff handle everything the zoo runs on: browsing exhibits, viewing animal profiles, buying tickets, tracking animal health records, managing employees, and pulling reports on the whole operation. I led a team of 5 to lay out the entire site with a fully functional backend, database, and server in under 3 months. Built with React on the front end and a Node and Express.js API over a SQL database hosted on Azure. The frontend is still up, but the servers behind it are switched off, so no live data loads.',
                image: 'images/zootabase_frontend.jpg',
                gallery: [
                    {
                        src: 'images/zootabase1.png',
                        caption: 'Admin portal: animal data report'
                    },
                    {
                        src: 'images/zootabase2.png',
                        caption: 'Admin portal: expanded animal record'
                    },
                    {
                        src: 'images/zootabase_er_tree.png',
                        caption: 'Entity relationship schema'
                    }
                ],
                links: [
                    { href: 'https://wildwoods-frontend-ewdsetbrhzf2bwac.eastus2-01.azurewebsites.net', label: 'Live' },
                    { href: 'https://github.com/pntran25/zootabase', label: 'GitHub' }
                ]
            },
            {
                title: 'Color Detector',
                tech: ['Python', 'OpenCV', 'Pandas', 'NumPy'],
                date: 'Apr 2025 – May 2025',
                description: 'Developed an interactive image processing tool using OpenCV that detects color names and RGB values upon pixel selection, achieving 97%+ accuracy on a dataset of 865 labeled colors using a K-Nearest Neighbors model. Documented test results and edge cases with screenshots and model performance metrics.',
                image: 'images/color-me.png',
                href: 'https://github.com/pntran25/color-detection',
                linkLabel: 'GitHub'
            },
            {
                title: 'Sonny',
                tech: ['C#', 'Unity', 'Git'],
                date: 'Dec 2024 – Present',
                description: 'Co-led a cross-functional team project with 14 team members, engineering an indie-thriller video game. Integrated AI mechanics (NavMesh), collaborated using version control in GitHub Desktop, and developed multiple object-oriented C# scripts to enhance different game mechanics.',
                image: 'images/sonny.png',
                href: 'https://github.com/odstpilot/ProjectSonny',
                linkLabel: 'GitHub'
            },
            {
                title: 'Apian Wish',
                tech: ['C#', 'Unity'],
                date: 'Sep 2023 – Apr 2024',
                description: 'A video game team project created for competition in the Technological Student Association from September 2023 to April 2024. I was the team lead, developing game mechanics using C# scripts in Unity Engine.',
                image: 'images/apian wish.png',
                href: 'https://play.unity.com/en/games/90dcf1a8-2604-4ea5-8c4a-9325f72d5cfe/apian-wish-tsa-2024',
                linkLabel: 'Live'
            },
            {
                title: 'Treasure X Truth',
                tech: ['C#', 'Unity'],
                date: 'Sep 2022 – Apr 2023',
                description: 'My first video game design when I first joined TSA (Technological Student Association) beginning in September 2022 to April 2023. I volunteered to be the team lead of 5 members, rapidly learning how to develop and code core game mechanics using C# scripts in Unity Engine.',
                image: 'images/treasure.png',
                href: 'https://play.unity.com/en/games/a3030501-fd63-459c-b98b-b0a985211b4d/treasure-x-truth',
                linkLabel: 'Live'
            },
            {
                title: 'Portfolio Website',
                tech: ['HTML', 'CSS', 'JavaScript'],
                description: "Built with HTML, CSS, and JavaScript with a retro Windows 95 theme. It's what you're looking at right now!",
                image: 'images/computer.png',
                href: 'https://github.com/pntran25/helloworld',
                linkLabel: 'GitHub',
                collapse: false
            }
        ]
    },

    /* Highlights */
    {
        id: 'highlights',
        label: 'Success',
        title: 'Success',
        icon: 'images/highlights.png',
        type: 'highlights',
        status: 'Achievements unlocked',

        // Either an award ({ title, subtitle, description, image })
        // or a set of links ({ links: [{ title, href, image }] }).
        items: [
            {
                title: 'CompTIA Security+',
                subtitle: 'In progress — exam scheduled Winter 2026',
                description: 'Currently studying for the CompTIA Security+ certification, covering threat analysis, incident response, risk management, cryptography, and security architecture — the same ground I worked in day to day during my cybersecurity internship at NRG Energy.'
            },
            {
                title: 'Technology Student Association — 1st & 2nd Place, Video Game Design',
                subtitle: 'Team Lead, Spring 2024 & Spring 2023',
                description: 'From September 2023 to April 2024, as a competitor for TSA (Technology Student Association), I led a team of 5 members as lead developer and team lead using Unity Engine with C# scripts, naming our project "Apian Wish". We placed 1st, competing against 10+ different schools in Video Game Design. This built on my previous video game project, "Treasure X Truth", which placed 2nd in 2023.',
                image: 'images/tsa.jpg'
            },
            {
                title: 'Code Coogs — 2nd Place, Best Team Award',
                subtitle: 'Game Development Team Lead',
                description: "Led a large-scale team project of 12+ members alongside Jonathan Cummins, tutoring members as we dove into game creation with Unity and C#. Our team placed 2nd in the awards for best team overall.",
                image: 'images/team.jpg'
            },
            {
                links: [
                    {
                        title: 'Academic Excellence Scholarship',
                        href: 'documents/academic.pdf',
                        image: 'images/scholarship.png'
                    },
                    {
                        title: "University of Houston Dean's List",
                        href: 'documents/deanslist.pdf',
                        image: 'images/deanslist.png'
                    }
                ]
            }
        ]
    },

    /* Documents */
    {
        id: 'documents',
        label: 'Papers',
        title: 'Papers',
        icon: 'images/documents.png',
        type: 'documents',

        resume: {
            heading: 'My Resume:',
            file: 'documents/CS Resume.pdf'
        },
        references: {
            heading: 'My References:',
            people: [
                {
                    name: 'Dr. Chang Yun',
                    role: 'Instructional Associate Professor',
                    credentials: 'Ph.D., University of Houston',
                    file: 'documents/changreference.pdf',
                    image: 'images/changreference.png'
                }
            ]
        }
    },

    /* Contact */
    {
        id: 'contact',
        label: 'Contact',
        title: 'Contact',
        icon: 'images/contactme.png',
        type: 'contact',
        status: 'Online • Messages welcome',

        details: [
            { label: 'Email',   value: 'phitrann0810@gmail.com' },
            { label: 'Outlook', value: 'pntran25@cougarnet.uh.edu' },
            { label: 'Phone',   value: '(713) 452-9278' }
        ],
        form: {
            heading: 'Send A Message!',
            // Web3Forms public access key; it is meant to be client-side.
            accessKey: '65771c5d-fded-4421-bfbe-cfebb5dceaad',
            action: 'https://api.web3forms.com/submit'
        }
    }

    ]
};
