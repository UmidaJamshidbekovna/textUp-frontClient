"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiCheck,
  FiStar,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  const languages = ["Python", "Node.js", "PHP", "Ruby", "Java", "C#", "GO"];

  const codeExamples = {
    Python: `import requests
from requests.auth import HTTPBasicAuth

apiKey = 'your_api_key'
apiSecret = 'your_api_secret'

basic = HTTPBasicAuth(apiKey, apiSecret)

sendRequest = {
    "messages": [
        {
            "content": "Hello SMS World from Python",
            "destination": ">>Your test phone number<<"
        }
    ]
}

try:
    sendResponse = requests.post(
        "https://rest.smsportal.com/bulkmessages",
        auth=basic,
        json=sendRequest
    )

    if sendResponse.status_code == 200:
        print("Success:")
        print(sendResponse.json())
    else:
        print("Failure:")
        print(sendResponse.json())
except Exception as e:
    print(e)`,
    "Node.js": `const axios = require('axios');

let apiKey = 'your_api_key';
let apiSecret = 'your_api_secret';
let accountApiCredentials = apiKey + ':' + apiSecret;

let buff = new Buffer.from(accountApiCredentials);
let base64Credentials = buff.toString('base64');

let requestHeaders = {
    headers: {
        'Authorization': \`Basic \${base64Credentials}\`,
        'Content-Type': 'application/json'
    }
};

let requestData = JSON.stringify({
    messages: [{
        content: "Hello SMS World from NodeJS",
        destination: ">>Your test phone number<<"
    }]
});

axios.post('https://rest.smsportal.com/bulkmessages', 
    requestData, 
    requestHeaders)
    .then(response => {
        if (response.data) {
            console.log("Success:");
            console.log(response.data);
        }
    })
    .catch(error => {
        if (error.response) {
            console.log("Failure:");
            console.log(error.response.data);
        }
    });`,
    PHP: `<?php
$apiKey = 'your_api_key';
$apiSecret = 'your_api_secret';
$accountApiCredentials = $apiKey . ':' . $apiSecret;

$base64Credentials = base64_encode($accountApiCredentials);
$authHeader = 'Authorization: Basic ' . $base64Credentials;

$sendData = '{ "messages" : [ { 
    "content" : "Hello SMS World from PHP", 
    "destination" : ">>Your test phone number<<" 
} ] }';

$options = array(
    'http' => array(
        'header' => array(
            "Content-Type: application/json", 
            $authHeader
        ),
        'method' => 'POST',
        'content' => $sendData,
        'ignore_errors' => true
    )
);

$sendResult = file_get_contents(
    'https://rest.smsportal.com/bulkmessages',
    false,
    stream_context_create($options)
);

if ($status === '200') {
    echo "Success:\\n";
    var_dump($sendResult);
}`,
    Ruby: `require 'net/https'
require 'uri'

apiKey = 'your_api_key'
apiSecret = 'your_api_secret'

uri = URI.parse("https://rest.smsportal.com/bulkmessages")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

sendRequestBody = '{
    "messages": [{
        "content": "Hello SMS World from Ruby",
        "destination": ">>Your test phone number<<"
    }]
}'

request = Net::HTTP::Post.new(uri.request_uri)
request.basic_auth(apiKey, apiSecret)
request.body = sendRequestBody
request.content_type = 'application/json'

sendResponse = http.request(request)

if sendResponse.code == '200'
    puts 'Success:'
    puts sendResponse.body
else
    puts 'Failure:'
    puts sendResponse.body
end`,
    Java: `import java.util.Base64;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class JavaExample {
    public static void main(String[] args) {
        String apiKey = "your_api_key";
        String apiSecret = "your_api_secret";
        String credentials = apiKey + ":" + apiSecret;

        String base64Credentials = Base64
            .getEncoder()
            .encodeToString(credentials.getBytes());

        HttpClient client = HttpClient.newHttpClient();
        String requestBody = "{ \\"messages\\" : [ { " +
            "\\"content\\" : \\"Hello SMS World from Java\\", " +
            "\\"destination\\" : \\">>Your test phone number<<\\" " +
        "} ] }";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI("https://rest.smsportal.com/BulkMessages"))
            .header("Authorization", "Basic " + base64Credentials)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
    }
}`,
    "C#": `using System.Net.Http.Headers;
using System.Text;

public class Program
{
    public static async Task Main()
    {
        var apiKey = "your_api_key";
        var apiSecret = "your_api_secret";
        
        var apiCredentials = Convert.ToBase64String(
            Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}")
        );

        var jsonSendRequest = "{ \\"messages\\" : [ { " +
            "\\"content\\" : \\"Hello SMS World from C#\\", " +
            "\\"destination\\" : \\">>Your test phone number<<\\" " +
        "} ] }";

        using var httpClient = new HttpClient();

        var request = new HttpRequestMessage(
            HttpMethod.Post, 
            "https://rest.smsportal.com/BulkMessages"
        ) {
            Content = new StringContent(
                jsonSendRequest, 
                Encoding.UTF8, 
                "application/json"
            )
        };
        
        request.Headers.Authorization = 
            new AuthenticationHeaderValue("Basic", apiCredentials);
    }
}`,
    GO: `package main

import (
    "bytes"
    b64 "encoding/base64"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    var apiKey string = "your_api_key"
    var apiSecret string = "your_api_secret"

    credentials := b64.StdEncoding.EncodeToString(
        []byte(apiKey + ":" + apiSecret)
    )

    client := &http.Client{}

    jsonSendRequest := \`{
        "messages" : [{
            "content" : "Hello SMS World",
            "destination" : ">>Your test phone number<<"
        }]
    }\`

    req, _ := http.NewRequest(
        "POST",
        "https://rest.smsportal.com/bulkmessages",
        bytes.NewBuffer([]byte(jsonSendRequest))
    )
    
    req.Header.Add("Content-Type", "application/json")
    req.Header.Add("Authorization", 
        fmt.Sprintf("Basic %s", credentials))

    resp, err := client.Do(req)
}`,
  };

  const features = [
    {
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop",
      title: "Reach millions with",
      highlight: "1:1 engagement",
      description:
        "Become the master of your SMS strategy by grabbing your Free SMS Playbook and achieve an astounding 98% read rate.",
      cta: "SMS Marketing Playbook",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      title: "Convert more",
      highlight: "customers at scale",
      description:
        "Increase engagement with personalized SMS automations that trigger based on customer behavior.",
      cta: "Learn about Flow Builder",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      title: "Expand the conversation with",
      highlight: "rich content",
      description:
        "Attach personalized, rich content to your text messages with our prebuilt landing page templates.",
      cta: "Learn about Landing Pages",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      title: "Predict your most",
      highlight: "valuable customers",
      description:
        "Segment and retarget those most likely to purchase by analyzing data and customer behavior.",
      cta: "Try for free",
    },
  ];

  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
            <div className={styles.desktopNav}>
              <div className={styles.navGroup}>
                <button className={styles.navButton}>
                  <span>Products</span>
                  <FiChevronDown />
                </button>
              </div>
              <Link href="#pricing" className={styles.navLink}>
                Pricing
              </Link>
              <Link href="#developers" className={styles.navLink}>
                Developers
              </Link>
              <div className={styles.navGroup}>
                <button className={styles.navButton}>
                  <span>Solutions</span>
                  <FiChevronDown />
                </button>
              </div>
              <div className={styles.navGroup}>
                <button className={styles.navButton}>
                  <span>Resources</span>
                  <FiChevronDown />
                </button>
              </div>
              <Link href="#contact" className={styles.navLink}>
                Contact
              </Link>
              <Link href="/auth/login" className={styles.loginBtn}>
                Login
              </Link>
            </div>
            <div className={styles.mobileNav}>
              <Link href="/auth/login" className={styles.mobileLoginBtn}>
                Login
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
              <span>Trusted by 10,000+ businesses</span>
            </div>
            <h1 className={styles.heroTitle}>
              Turn SMS into <span>revenue</span>
            </h1>
            <p className={styles.heroDescription}>
              Transform customer experience and drive sales by instantly
              connecting with your audience.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/auth/signup" className={styles.heroPrimaryBtn}>
                Start Your Free Trial
              </Link>
              <Link href="#features" className={styles.heroSecondaryBtn}>
                How It Works
              </Link>
            </div>
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <FiCheck />
                <span>No credit card needed</span>
              </div>
              <div className={styles.trustItem}>
                <FiCheck />
                <span>Cancel anytime</span>
              </div>
              <div className={styles.trustItem}>
                <FiCheck />
                <span>100 Free SMS</span>
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
            <h2>Get the right message across</h2>
            <p>
              Our conversational commerce portal lets you engage with customers
              exactly when they want you to.
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
                <button className={styles.featureCta}>
                  <span>{feature.cta}</span>
                  <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="developers" className={styles.codeSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Or build it with our APIs</h2>
            <p>Create a scalable messaging solution in minutes.</p>
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
                <span>{selectedLanguage} Example</span>
                <button>Copy</button>
              </div>
              <div className={styles.codeBlockContent}>
                <pre>
                  <code>{codeExamples[selectedLanguage]}</code>
                </pre>
              </div>
            </div>
            <div className={styles.codeCtas}>
              <button className={styles.codePrimaryBtn}>
                API Documentation
              </button>
              <button className={styles.codeSecondaryBtn}>View Recipes</button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Choose your plan</h2>
            <p>Choose your SMS plan and sending location</p>
          </div>
          <div className={styles.pricingCards}>
            <div className={styles.pricingCard}>
              <h3>Free</h3>
              <p>
                Try our Free plan and start testing. Ideal for getting started
                and exploring all of the SMS Portal products.
              </p>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$0</span>
              </div>
              <p className={styles.priceHighlight}>100 Free SMS</p>
              <button className={styles.pricingBtnSecondary}>Try Now</button>
              <p className={styles.priceNote}>
                Cancel any time. No credit card needed.
              </p>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.featuredBadge}>
                <span>Recommended</span>
              </div>
              <h3>Standard</h3>
              <p>
                Choose your ideal plan or bundle size and Pay-as-you-Go. No
                Subscriptions, No Contracts.
              </p>
              <div className={styles.price}>
                <span className={styles.priceFrom}>From</span>
                <span className={styles.priceAmount}>$0.08</span>
              </div>
              <p className={styles.priceHighlight}>per message</p>
              <button className={styles.pricingBtnPrimary}>Sign up Now</button>
              <p className={styles.priceNote}>
                Excl. VAT/BST/Tax (Incl Carrier costs)
              </p>
            </div>

            <div className={styles.pricingCard}>
              <h3>Enterprise</h3>
              <p>
                High volume senders can enjoy the Enterprise plan and receive
                account feature benefits and VIP support.
              </p>
              <div className={styles.price}>
                <span className={styles.priceAmountSmall}>Get in touch</span>
              </div>
              <p className={styles.priceHighlight}>per SMS volume</p>
              <button className={styles.pricingBtnDark}>Contact Sales</button>
              <p className={styles.priceNote}>T&C&apos;s apply</p>
            </div>
          </div>
          <div className={styles.pricingFooter}>
            <button>Compare plans</button>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <FiSend />
            </div>
            <h2>Unlock the potential of SMS</h2>
            <p>
              Be the master of your SMS strategy with our tactical Playbook to
              drive repeat purchases and sales.
            </p>
            <button className={styles.ctaBtn}>
              <span>Get your Free SMS Playbook!</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <Logo color="white" />
              <p>
                In a few simple steps you can find out why over 10,000 companies
                choose us as their SMS provider.
              </p>
              <Link href="/auth/signup" className={styles.footerCta}>
                Start free trial
              </Link>
            </div>
            <div className={styles.footerColumn}>
              <h4>Products</h4>
              <ul>
                <li>
                  <a href="#">SMS</a>
                </li>
                <li>
                  <a href="#">Numbers + Short Codes</a>
                </li>
                <li>
                  <a href="#">URL Shortening</a>
                </li>
                <li>
                  <a href="#">Landing Pages</a>
                </li>
                <li>
                  <a href="#">Reseller Partnership</a>
                </li>
                <li>
                  <a href="#">Flow Builder</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#developers">Developers</a>
                </li>
                <li>
                  <a href="#">Integrations</a>
                </li>
                <li>
                  <a href="#">Insights Blog</a>
                </li>
                <li>
                  <a href="#">Help Centre</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerTrust}>
            <p>
              <span>Trusted by over 10,000 customers</span>
            </p>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2025 SMSPortal. All rights reserved</p>
            <div className={styles.footerLinks}>
              <a href="#">Privacy</a>
              <a href="#">Terms of Service</a>
              <a href="#">FAQ</a>
              <a href="#">Help Centre</a>
              <a href="#">PAIA Manual</a>
              <a href="#">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
