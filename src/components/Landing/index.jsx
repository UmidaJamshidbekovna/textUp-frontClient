"use client";
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo";
import { getCookie } from "cookies-next";
import {
    FiMenu,
    FiX,
    FiChevronDown,
    FiCheck,
    FiStar,
    FiArrowRight,
    FiSend,
    FiPhone,
    FiMail,
} from "react-icons/fi";
import { features, codeExamples } from './mock';

const Landing = () => {
    const accessToken = getCookie('accessToken');
    const [selectedLanguage, setSelectedLanguage] = useState("Python");
    const languages = ["Python", "Node.js", "PHP", "Ruby", "Java", "C#", "GO"];




    return (
        <div className={styles.landing}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.navContent}>
                        <Link href="/" className={styles.logo}>
                            <Logo />
                        </Link>
                        <div className={styles.desktopNav}>

                            <Link href="#pricing" className={styles.navLink}>
                                Narxlar
                            </Link>
                            <Link href="#developers" className={styles.navLink}>
                                API Hujjatlari
                            </Link>
                            <Link href="#features" className={styles.navLink}>
                                Yechimlar
                            </Link>

                            <div className={styles.contactInfo}>
                                <a href="tel:+998555144909" className={styles.contactItem}>
                                    <FiPhone />
                                    <span>+998555144909</span>
                                </a>
                                <a href="mailto:admin@textup.uz" className={styles.contactItem}>
                                    <FiMail />
                                    <span>admin@textup.uz</span>
                                </a>
                            </div>
                            <Link href={accessToken ? "/user/sms" : "/auth/login"} className={styles.loginBtn}>
                                Kirish
                            </Link>
                        </div>
                        <div className={styles.mobileNav}>
                            <Link href={accessToken ? "/user/sms" : "/auth/login"} className={styles.mobileLoginBtn}>
                                Kirish
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <section className={styles.hero}>
                <div className={styles.heroDecorations}>
                    <div className={styles.decoration1}></div>
                    <div className={styles.decoration2}></div>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroCenter}>
                        <div className={styles.badge}>
                            <FiStar />
                            <span>Ko&apos;plab bizneslar tanlagan platforma</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            Zamonaviy <span>SMS Platforma</span>
                        </h1>

                        <p className={styles.heroDescription}>
                            Tezkor aloqa orqali mijozlar tajribasini yangi bosqichga ko‘tarib,{" "}
                            <br /> biznes o&apos;sishini jadallashtiring.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link
                                href={accessToken ? "/user/sms" : "/auth/login"}
                                className={styles.heroPrimaryBtn}
                            >
                                Tezkor SMS
                            </Link>
                        </div>
                        <div className={styles.trustIndicators}>
                            <div className={styles.trustItem}>
                                <FiCheck />
                                <span>Qulay interface</span>
                            </div>
                            <div className={styles.trustItem}>
                                <FiCheck />
                                <span>Tezkor habar yuborish</span>
                            </div>
                            <div className={styles.trustItem}>
                                <FiCheck />
                                <span>24/7 Texnik yordam</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.heroImageWrapper}>
                        <div className={styles.heroImage}>
                            <Image
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
                                alt="SMS Dashboard"
                                width={1200}
                                height={600}
                                priority
                            />
                            <div className={styles.heroImageOverlay}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Bizning Imkoniyatlar</h2>
                        <p>
                            Bizning platforma — ommaviy xabar yuborish, kontaktlarni
                            boshqarish va tahlil qilish uchun tezkor va ishonchli yechim.
                        </p>
                    </div>
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureImage}>
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={600}
                                        height={400}
                                    />
                                </div>
                                <h3>
                                    {feature.title} <span>{feature.highlight}</span>
                                </h3>
                                <p>{feature.description}</p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="developers" className={styles.codeSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>API orqali yanada tez</h2>
                        <p>
                            Bir necha daqiqada kengaytiriladigan xabar yuborish yechimini
                            yarating.
                        </p>
                    </div>

                    <div className={styles.codeExamples}>
                        <div className={styles.languageTabs}>
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className={selectedLanguage === lang ? styles.active : ""}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div className={styles.codeBlock}>
                            <div className={styles.codeBlockHeader}>
                                <div className={styles.codeBlockDots}>
                                    <div className={styles.dot1}></div>
                                    <div className={styles.dot2}></div>
                                    <div className={styles.dot3}></div>
                                </div>
                                <span>{selectedLanguage} Misol</span>
                                <button>Nusxalash</button>
                            </div>
                            <div className={styles.codeBlockContent}>
                                <pre>
                                    <code>{codeExamples[selectedLanguage]}</code>
                                </pre>
                            </div>
                        </div>

                        <div className={styles.codeCtas}>
                            <button className={styles.codePrimaryBtn}>
                                API Hujjatlari
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className={styles.pricing}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>SMS Paketlari</h2>
                        <p>O&apos;zingizga mos SMS paketini tanlang va operatorlar bilan ishlang</p>
                    </div>

                    <div className={styles.pricingOverview}>
                        <p className={styles.overviewLabel}>6K Paket</p>
                        <div className={styles.overviewPrice}>
                            <span className={styles.overviewAmount}>360 000</span>
                            <span className={styles.overviewCurrency}>so&apos;m</span>
                        </div>
                        <p className={styles.overviewSms}>6000 SMS</p>
                    </div>


                    <div className={styles.pricingCardsContainer}>

                        <div className={styles.pricingTableCard}>
                            <h4>Paketdan tashqari narxlar</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Aloqa operatorlari</th>
                                        <th>Servis</th>
                                        <th>Reklama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ucell</td>
                                        <td>150 so&apos;m</td>
                                        <td>345 so&apos;m</td>
                                    </tr>
                                    <tr>
                                        <td>Beeline</td>
                                        <td>105 so&apos;m</td>
                                        <td>275 so&apos;m</td>
                                    </tr>
                                    <tr>
                                        <td>MobiUz</td>
                                        <td>100 so&apos;m</td>
                                        <td>290 so&apos;m</td>
                                    </tr>
                                    <tr>
                                        <td>Uzmobile</td>
                                        <td>Paket ichida</td>
                                        <td>175 so&apos;m</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className={styles.mainPackageCard}>


                            <div className={styles.operatorsSection}>
                                <h4>Paket tarkibiga kiruvchi operatorlar</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Aloqa operatorlari</th>
                                            <th>Servis</th>
                                            <th>Reklama</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Humans</td>
                                            <td><span className={styles.checkIcon}>✔️</span></td>
                                            <td><span className={styles.checkIcon}>✔️</span></td>
                                        </tr>
                                        <tr>
                                            <td>Perfectum</td>
                                            <td><span className={styles.checkIcon}>✔️</span></td>
                                            <td><span className={styles.checkIcon}>✔️</span></td>
                                        </tr>
                                        <tr>
                                            <td>Uztelecom</td>
                                            <td><span className={styles.checkIcon}>✔️</span></td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                        </tr>
                                        <tr>
                                            <td>Ucell</td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                        </tr>
                                        <tr>
                                            <td>Beeline</td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                        </tr>
                                        <tr>
                                            <td>MobiUz</td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                            <td><span className={styles.crossIcon}>❌</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>


                        <div className={styles.pricingTableCard}>
                            <h4>Limitdan oshgani</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Aloqa operatorlari</th>
                                        <th>Servis</th>
                                        <th>Reklama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Humans</td>
                                        <td>80 so&apos;m</td>
                                        <td>80 so&apos;m</td>
                                    </tr>
                                    <tr>
                                        <td>Perfectum</td>
                                        <td>80 so&apos;m</td>
                                        <td>80 so&apos;m</td>
                                    </tr>
                                    <tr>
                                        <td>Uzmobile</td>
                                        <td>80 so&apos;m</td>
                                        <td>175 so&apos;m</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <div className={styles.ctaIcon}>
                            <FiSend />
                        </div>
                        <h2>SMS imkoniyatlarini oching</h2>
                        <p>
                            SMS strategiyangizni boshqaring va takroriy xaridlar hamda
                            sotuvlarni oshiring.
                        </p>

                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.footerMain}>
                        <div className={styles.footerBrand}>
                            <Logo color="white" />
                            <p>
                                Bir necha oddiy qadamda k&apos;plab kompaniyalar
                                nima uchun bizni SMS provayderi sifatida tanlaganini bilib oling.
                            </p>

                        </div>
                        <div className={styles.footerColumn}>
                            <h4>Mahsulotlar</h4>
                            <ul>
                                <li>
                                    <a href="#">SMS</a>
                                </li>
                                <li>
                                    <a href="#">Raqamlar + Qisqa kodlar</a>
                                </li>
                                <li>
                                    <a href="#">URL Qisqartirish</a>
                                </li>
                                <li>
                                    <a href="#">Landing sahifalar</a>
                                </li>
                                <li>
                                    <a href="#">Sotuvchilik hamkorligi</a>
                                </li>
                                <li>
                                    <a href="#">Oqim yaratuvchi</a>
                                </li>
                            </ul>
                        </div>
                        {/* <div className={styles.footerColumn}>
                            <h4>Kompaniya</h4>
                            <ul>
                                <li>
                                    <a href="#">Biz haqimizda</a>
                                </li>
                                <li>
                                    <a href="#pricing">Narxlar</a>
                                </li>
                                <li>
                                    <a href="#">Karyera</a>
                                </li>
                                <li>
                                    <a href="#">Biz bilan bog&apos;lanish</a>
                                </li>
                            </ul>
                        </div> */}
                        {/* <div className={styles.footerColumn}>
                            <h4>Resurslar</h4>
                            <ul>
                                <li>
                                    <a href="#developers">Dasturchilar</a>
                                </li>
                                <li>
                                    <a href="#">Integratsiyalar</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Yordam markazi</a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    {/* <div className={styles.footerTrust}>
                        <p>
                            <span>10,000 dan ortiq mijozlar ishonchiga sazovor</span>
                        </p>
                    </div> */}
                    <div className={styles.footerBottom}>
                        <p>© 2025 SMSPortal. Barcha huquqlar himoyalangan</p>
                        {/* <div className={styles.footerLinks}>
                            <a href="#">Maxfiylik</a>
                            <a href="#">Xizmat ko&apos;rsatish shartlari</a>
                            <a href="#">FAQ</a>
                            <a href="#">Yordam markazi</a>
                            <a href="#">PAIA qo&apos;llanma</a>
                            <a href="#">Xulq-atvor kodeksi</a>
                        </div> */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
