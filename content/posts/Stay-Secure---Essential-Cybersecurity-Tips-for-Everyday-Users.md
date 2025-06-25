---
excerpt: "Cybersecurity Tips for Everyday Users."
date: 2024-06-28T22:00:00.000Z
category: "Cybersecurity>Security Awareness"
title: "Stay Secure - Essential Cybersecurity Tips for Everyday Users"
---
# Stay Secure: Essential Cybersecurity Tips for Everyday Users

The world has changed a lot, as has our way of living. We now live in a world where billions of IoT devices, referred to as the Internet of Things - devices with various sensors connected to the Internet that share information - are processing data online. Furthermore, with digitalization being everyone's new goal, people must stay up to date in this field.

This also means securing yourself from online harms such as phishing attempts - websites designed to steal your email, password, and other credentials by cloning familiar websites - malware that can infect your devices and cause harm, and many other threats. We will use the term **Cybersecurity** refers to any measure or practice taken to prevent online attacks or reduce their impact. While this subject can get very complicated, we will focus on tips to help everyday users like you stay safe or at least reduce the impact of such attacks.

## Using Strong Passwords and Managing Them

While some people might think "Oh, this is obvious," it is still a big security threat. Many people set a password they can remember easily, which often leads to these passwords being something personal such as:

- Children's or pet names
- Birthdates for PIN codes
- Book quotes
- Words found in a dictionary
- Favorite sports teams or player names
- "Random" keyboard combinations like "qwerty"
- Just some numbers

These passwords can be guessed very easily, leading to unauthorized access to your account.

To avoid this, your password should be at least 12 characters long, containing:

- Numbers
- Letters (uppercase and lowercases)
- Special characters (#?! ...), which might vary depending on the website.

Furthermore, changing the password every month or so is not required unless:

- You think your password has been stolen
- There was a data breach on a website you were registered to
- You opened malware or have been phished
- There were numerous attempts to access your account
- You shared a password with someone else temporarily

Now that you have hundreds or thousands of different passwords for every website you are registered with, where should you save them for easy login and security purposes? The answer is: **Password Manager**. As the name suggests, they help you manage your passwords for different services.

The hard part is finding a password manager that meets your requirements. Take a paper and write down the features a password manager should have. While I won't list all available password managers here, the one I use is [Bitwarden](https://bitwarden.com/), a password manager with essential features such as unlimited devices, core functions like generators, storage options for credit cards, notes, and identities, and sharing options for free. It also offers self-hosting, which might be interesting for some people. Another very basic password manager is [KeePass](https://keepass.info/), which saves your passwords in a locally generated database. There are many password managers out there, so take some time to find the right one for you.

## General Security Tips

Now let's focus on some general security tips that should be implemented in your daily life.

### Use HTTPS Secured Websites

Starting with a general rule when visiting a website. Have you ever thought about what HTTP (**H**ypertext **T**ransfer **P**rotocol) in *http(s)://something.com* stands for? It is a request-response-based protocol, a set of rules for formatting and processing data that enables data transfer between a client (you) and a server (website). The addition of **s**, which stands for secure, in **http** means that the data transfer is secured, meaning encrypted, throughout the session. It uses an encryption protocol called TLS (Transport Layer Security), formerly known as SSL (Secure Socket Layer), to secure the communication.

Therefore, every time you visit a website, make sure that the website starts with *https*. This can be checked by looking for a closed lock icon in the browser, whereas an http website will have a strikethrough lock icon. This may vary depending on the browser you use.

### Don't Click on Random Links

If you see a link, make sure that it redirects to the website being displayed. On a desktop, you can check this by hovering over a link. On the bottom left, you should see the link where you will be redirected once you click it.

Think before you click - be skeptical. Just because it is advertised on big companies like Meta (Facebook, Instagram) or elsewhere, doesn't mean it is legitimate. Many ads hide their true intentions or malicious links to get approved for advertising.

It might be a CSRF (Cross-Site Request Forgery Attack). If you happen to click on a hyperlink sent via email and it displays something like "Your password has been reset," you might have fallen for a CSRF attack. This attack involves a forged request that performs actions like changing your password. Although many websites now have protections against such attacks, it's always better to be safe than sorry.

There are many things that can happen when clicking on an unknown link. Therefore, always think and check before you click.

### Use Adblocker

Adblockers are handy extensions that can help reduce or completely remove ads displayed on a website. Besides that, they have some other cool indirect benefits such as:

1. Making your browsing safer by removing ads with malicious intentions.
2. Speeding up page load times by blocking several elements being loaded.
3. Stopping ad servers from tracking you, which not only display ads but also monitor your online activities.
4. Helping protect your privacy in general.

Although this might sound all good, there are some downsides to using adblockers. They might break websites by blocking requests needed for the site to function or harm people who rely on ads for their income.

### Don't Reveal Yourself Too Much - Reducing Digital Footprints

Everything you do on the Internet leaves traces behind - digital footprints. It is important not to leave too much data behind that can be used against you. Digital footprints can be divided into active digital footprints, where you share information about yourself willingly, such as social media posts, comments, or file sharing, and passive digital footprints, where your information is collected without your permission or knowledge, such as IP addresses or browsing history.

These digital footprints can be used for bad intentions, such as targeted advertising or hacking. Therefore, control your data flow and be aware of what type of information is online by "*doxing*" yourself - gathering public information about yourself online.

### Stay Up to Date

Staying up to date is crucial in this new world. Things are changing rapidly, whether it's the climate, politics, or the internet. Every day, something is happening in the cybersecurity world. Companies are being attacked, new vulnerabilities are being detected, people are being hacked, and more.

Therefore, you should stay up to date by updating your devices and apps, which often include fixes or patches for vulnerabilities. Check if there has been an attack or data breach at a company where you are registered and take necessary measures if it is the case. In general, stay alert to what is happening in the world.

## Enable Multifactor Authentication

Every time you use a service like social media or any website with a login feature, you are required to authenticate yourself. The authentication process can be done in various ways, such as providing credentials (username/email and password), biometric authentication (mostly on smartphones), or other methods like SSO in companies. Many of these single-factor authentication methods are secure as long as they are implemented correctly and the user has a strong password.

By enabling MFA (multifactor authentication), the user has to verify their identity twice or more to gain access to the service/account. This way, even if a hacker has your correct credentials, they will be useless unless they can pass the second authentication, usually in the form of an SMS code or a randomly generated code from an authenticator app.

There are many services available, such as Microsoft Authenticator or Google Authenticator, which can be used for MFA. This, however, mostly depends on the application and the type of MFA they provide.

## Public Wi-Fi

Ah, free public Wi-Fi. We love it. What's the catch? Normally nothing, but hackers don't see it this way. Public Wi-Fi is convenient, but you should avoid connecting to it unless absolutely necessary. Data sent through public Wi-Fi can be intercepted by anyone, and attacks like Man-in-the-Middle can be performed, where attackers position themselves between you and the endpoint you are trying to communicate with, intercepting and potentially altering the data.

To avoid these risks, do not connect to public Wi-Fi unless absolutely necessary. If you must, use a VPN to provide an encrypted tunnel between you and your endpoint, avoid giving sensitive information or conducting transactions, and generally use websites secured with a certificate (`https`://).

## Stay Alert for Attacks

As stated, the world, especially the internet, is constantly changing. New types of attacks are being discovered, people and corporations are being attacked and many more. Even if you think you don't have anything to hide, which is probably not true, stay alert when doing anything on the internet. Be cautious about things like "Oh, I got an email and won something" - Did you? or "Urgent: Reset your password immediately" - No, you don't have to.

There are attacks that can be used on normal people very effectively, such as phishing and social engineering, which is the manipulation of people into taking actions that might compromise their security or privacy, or malware being spread on the internet waiting for a "victim" to click on it.

## Final Thoughts

These are some basic tips I have obtained throughout my IT school career. Of course, there are still many things missing here, but I thought this might help a little bit. And yes, everyone can be a victim of something - don't think you are untouchable. It is just a matter of time. But the consequences can be minimized if the right measures are taken.
