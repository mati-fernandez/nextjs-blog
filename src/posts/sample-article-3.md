---
title: "Building a Full-Stack App with Next.js and Supabase"
date: "2024-11-21"
author: "Matu"
---

## Introduction

Combining **Next.js** with **Supabase** gives you a powerful stack for creating full-stack applications with a serverless backend. Supabase is an open-source Firebase alternative that provides a PostgreSQL database, real-time subscriptions, authentication, and storage. Together, they make it easy to build scalable applications without managing backend infrastructure.

In this article, we’ll explore how to set up Supabase with Next.js and cover the basics of authentication, database integration, and real-time features.

## Why Use Supabase with Next.js?

- **Open Source**: Supabase is open-source, offering more flexibility and control over your data.
- **PostgreSQL Database**: Provides a robust, SQL-based database with real-time capabilities.
- **Authentication**: Built-in authentication system that integrates easily with frontend frameworks.
- **Realtime Updates**: Ideal for applications that require real-time functionality.
- **Next.js API Routes**: Seamlessly connect your frontend and backend using serverless functions.

This stack is perfect for building modern, real-time applications like chat apps, dashboards, or e-commerce sites.

## Setting Up Your Environment

1. Initialize a Next.js Project

If you haven’t already, create a Next.js project:

```bash
npx create-next-app@latest my-supabase-app
cd my-supabase-app
npm run dev
```

2. Set Up Supabase
Create a Supabase Account: Sign up at supabase.io.
Create a New Project: Once logged in, create a new project and configure your database settings.
Get API Keys: Navigate to your project’s API settings to get your Supabase URL and anon key. You’ll need these to connect Next.js to your Supabase database.

3. Install the Supabase Client
Add the Supabase client to your project:

```bash

npm install @supabase/supabase-js
Then, create a file to configure your Supabase client (lib/supabaseClient.js):
```

```javascript

// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
Add your keys to .env.local:
```

```plaintext

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart the server for the environment variables to load.

Implementing Authentication with Supabase
Supabase provides email and password-based authentication out of the box, along with support for OAuth providers.

Signup and Login
Create a signup page to allow users to register:

```javascript
// pages/signup.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.log('Error:', error.message);
    else console.log('User created:', user);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
```

For login, you can create a similar function using supabase.auth.signIn.

Authentication State
To check if a user is logged in, use Supabase’s onAuthStateChange method. This allows you to store user info in the application’s state or context for a better user experience.

Fetching Data from Supabase
Suppose we have a “Profiles” table in Supabase that contains user data. To fetch profiles, you can use supabase.from(table).select(). Here’s an example that lists user profiles:

```javascript
// pages/profiles.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) console.log('Error:', error.message);
      else setProfiles(data);
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profiles;

```

Real-Time Updates with Supabase
Supabase supports real-time data syncing, which is great for chat applications, live data dashboards, etc. To listen for changes, use the supabase.from('table').on('event', callback).subscribe() method.

Example:

```javascript
useEffect(() => {
  const profileSubscription = supabase
    .from('profiles')
    .on('INSERT', (payload) => {
      setProfiles((current) => [...current, payload.new]);
    })
    .subscribe();

  return () => {
    supabase.removeSubscription(profileSubscription);
  };
}, []);
```

This example listens for new profiles being added to the database and updates the list in real-time.

Deploying the Next.js and Supabase App
Commit Your Code: Push your code to a GitHub repository.
Deploy on Vercel: Link your GitHub repo to Vercel, where your environment variables will be securely managed.
Next.js handles serverless functions for API routes, making deployment smooth and efficient.

## Conclusion
Using Supabase with Next.js provides a full-stack solution with powerful features for real-time data handling, authentication, and a PostgreSQL-based backend. Together, they simplify building robust applications, from simple websites to complex web apps with dynamic data needs.

