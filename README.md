# E-commerce - trading of goods and services on the internet

Features the ability to add and edit products on the go using Sanity and the integration with Stripe for checkout.

## Setups

Before you start, you will need to create the <code>.env</code> file in the root folder to connect to Sanity and Stripe.

Open the .env file and type the following variables:

```bash
    NEXT_PUBLIC_SANITY_TOKEN = *add your Sanity token*
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = *add your Stripe publishable key*
    NEXT_PUBLIC_STRIPE_SECRET_KEY = *add your Stripe secret key*
```

## Available Scripts

Install packages and all dependencies.

```bash
    npm i
```

Runs the app in the development mode.

```bash
    npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Learn More

To learn more about this project, take a look at the following resources:

- [Next.js](https://nextjs.org/) - open-source web development framework providing React-based web applications with server-side rendering and static website generation.
- [React](https://reactjs.org/) - open-source frontend JavaScript library for building user interfaces based on components.
- [Sanity](https://www.sanity.io/) - headless CMS platform for structured content that lets you build better digital experiences.
- [Stripe](https://stripe.com/) - offers payment-processing software and application programming interfaces for e-commerce websites and mobile applications.

## Deployment

Application hosted on AWS: https://e-commerce.sebastiansanchis.com/
