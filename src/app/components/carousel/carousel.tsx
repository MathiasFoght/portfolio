import type React from "react"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import styles from "./styles.module.css"

interface DataPath {
    dataPath: string[]
}

interface Data{
    name: string
    icon: string
}



const Carousel: React.FC<DataPath> = ({dataPath}) => {
    const displayNames: Record<string, string> = {
        "Csharp.svg": "C#",
        "Dotnet.svg": ".NET 8.0",
    };

    const showcasedData: Data[] = dataPath.map((file) => ({
        name: displayNames[file] || file.replace(".svg", ""),
        icon: `/assets/${file}`,
    }));

    const extendedDataShowcasing = [...showcasedData, ...showcasedData]

    return (
        <div className={styles.container}>
            <Marquee speed={60}>
                {extendedDataShowcasing.map((item, index) => (
                    <div key={`${item.name}-${index}`} className={styles.item}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={32}
                                height={32}
                                className={styles.icon}
                                aria-hidden="true"
                                priority={true}
                            />
                        </div>
                        <span className={styles.name}>{item.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}

export default Carousel