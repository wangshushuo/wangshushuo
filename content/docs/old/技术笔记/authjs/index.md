---
title: authjs
date: 2024-04-13 23:54:00
---
```ts
import NextAuth from "next-auth"  
import GitHub from "next-auth/providers/github"  
  
export const { handlers, signIn, signOut, auth } = NextAuth({  
  providers: [  
    GitHub  
  ],  
  callbacks: {  
    authorized({ request, auth }) {  
      const { pathname } = request.nextUrl  
      if (pathname === "/middleware-example") return !!auth  
      return true  
    },  
    jwt({ token, trigger, session, user }) {  
      if (user) { // User is available during sign-in  
        token.id = user.id  
      }  
      if (trigger === "update") token.name = session.user.name  
      return token  
    },  
  },  
})
```

github登录后会走到signIn中

jwt中比较适合将一些用户角色之类的信息存到token

