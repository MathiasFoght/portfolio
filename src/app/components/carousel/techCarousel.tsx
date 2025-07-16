import type React from "react"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import styles from "./styles.module.css"

export const assetsPaths = [
    "Azure.svg",
    "Azure SQL.svg",
    "Bash.svg",
    "Csharp.svg",
    "Dotnet.svg",
    "CSS3.svg",
    "Docker.svg",
    "Firebase.svg",
    "GitHub.svg",
    "GitLab.svg",
    "GraphQL.svg",
    "HTML5.svg",
    "JavaScript.svg",
    "Kubernetes.svg",
    "MongoDB.svg",
    "Swagger.svg",
    "Next.js.svg",
    "Vercel.svg",
    "Node.js.svg",
    "PHP.svg",
    "Postman.svg",
    "RabbitMQ.svg",
    "React.svg",
    "Shopware.svg",
    "Symfony.svg",
    "TypeScript.svg",
    "Vue.js.svg"
]

interface Technology {
    name: string
    icon: string
}

const displayNames: Record<string, string> = {
    "Csharp.svg": "C#",
    "Dotnet.svg": ".NET 8.0",
};

const technologiesData: Technology[] = assetsPaths.map((file) => ({
    name: displayNames[file] || file.replace(".svg", ""),
    icon: `/assets/${file}`,
}));

const extendedTechnologies = [...technologiesData, ...technologiesData]

const TrustedBySection: React.FC = () => {
    return (
        <div className={styles.container}>
            <Marquee speed={60}>
                {extendedTechnologies.map((tech, index) => (
                    <div key={`${tech.name}-${index}`} className={styles.techItem}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={32}
                                height={32}
                                className={styles.icon}
                                aria-hidden="true"
                                priority={true}
                            />
                        </div>
                        <span className={styles.name}>{tech.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}

export default TrustedBySection