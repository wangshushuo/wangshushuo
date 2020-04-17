---
date: 2020-01-19T13:51:29+08:00
toc: true
url: /Spring Security JWT.html
title: Spring Security JWT
categories:
- api
- 后端
- spring
---

# Spring Security Architecture

Spring Security 架构，入门介绍：[网址](https://spring.io/guides/topicals/spring-security-architecture/)

## Authentication and Access Control

应用程序安全性归结为或多或少的两个独立问题：身份验证（您是谁？）和授权（您可以做什么？）。有时人们会说“访问控制”而不是“授权”，这可能会造成混淆，但是以这种方式思考可能会有所帮助，因为“授权”在其他地方超载。 Spring Security的体系结构旨在将身份验证与授权分开，并具有策略和扩展点。

### Authentication

身份验证的主要策略接口是AuthenticationManager，它只有一种方法：


----

#  OAuth 2.0 Resource Server

Spring Security supports protecting endpoints using two forms of OAuth 2.0 [Bearer Tokens](https://tools.ietf.org/html/rfc6750.html):

* [JWT](https://tools.ietf.org/html/rfc7519) 
* Opaque Tokens

This is handy in circumstances where an application has delegated its authority management to an [authorization server](https://tools.ietf.org/html/rfc6749) (for example, Okta or Ping Identity). This authorization server can be consulted by resource servers to authorize requests.

> Working samples for both [JWTs](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver) and [Opaque Tokens](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver-opaque) are available in the [Spring Security repository](https://github.com/spring-projects/spring-security/tree/master/samples).

## 1 Dependencies

Most Resource Server support is collected into `spring-security-oauth2-resource-server`. However, the support for decoding and verifying JWTs is in `spring-security-oauth2-jose`, meaning that both are necessary in order to have a working resource server that supports JWT-encoded Bearer Tokens.

## 2 Minimal Configuration for JWTs

When using [Spring Boot](https://spring.io/projects/spring-boot), configuring an application as a resource server consists of two basic steps. First, include the needed dependencies and second, indicate the location of the authorization server.

### Specifying the Authorization Server

In a Spring Boot application, to specify which authorization server to use, simply do:

```yml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://idp.example.com/issuer
```

Where [`https://idp.example.com/issuer`](https://idp.example.com/issuer) is the value contained in the `iss` claim for JWT tokens that the authorization server will issue. Resource Server will use this property to further self-configure, discover the authorization server’s public keys, and subsequently validate incoming JWTs.

> To use the `issuer-uri` property, it must also be true that one of `https://idp.example.com/issuer/.well-known/openid-configuration`, `https://idp.example.com/.well-known/openid-configuration/issuer`, or `https://idp.example.com/.well-known/oauth-authorization-server/issuer` is a supported endpoint for the authorization server. This endpoint is referred to as a [Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig) endpoint or a [Authorization Server Metadata](https://tools.ietf.org/html/rfc8414#section-3) endpoint.

And that’s it!

### Startup Expectations

When this property and these dependencies are used, Resource Server will automatically configure itself to validate JWT-encoded Bearer Tokens. It achieves this through a deterministic startup process:

1. Hit the Provider Configuration or Authorization Server Metadata endpoint, processing the response for the `jwks_url` property 
2. Configure the validation strategy to query `jwks_url` for valid public keys 
3. Configure the validation strategy to validate each JWTs `iss` claim against [`https://idp.example.com`](https://idp.example.com).

A consequence of this process is that the authorization server must be up and receiving requests in order for Resource Server to successfully start up.

> If the authorization server is down when Resource Server queries it (given appropriate timeouts), then startup will fail.

### Runtime Expectations

Once the application is started up, Resource Server will attempt to process any request containing an `Authorization: Bearer` header:

```
GET / HTTP/1.1
Authorization: Bearer some-token-value # Resource Server will process this
```

So long as this scheme is indicated, Resource Server will attempt to process the request according to the Bearer Token specification. Given a well-formed JWT, Resource Server will:

1. Validate its signature against a public key obtained from the `jwks_url` endpoint during startup and matched against the JWTs header 
2. Validate the JWTs `exp` and `nbf` timestamps and the JWTs `iss` claim, and 
3. Map each scope to an authority with the prefix `SCOPE_`.

> As the authorization server makes available new keys, Spring Security will automatically rotate the keys used to validate the JWT tokens.

The resulting `Authentication#getPrincipal`, by default, is a Spring Security `Jwt` object, and `Authentication#getName` maps to the JWT’s `sub` property, if one is present. From here, consider jumping to: 

- [How to Configure without Tying Resource Server startup to an authorization server’s availability](#oauth2resourceserver-jwt-jwkseturi "12.3.3 Specifying the Authorization Server JWK Set Uri Directly") 
- [How to Configure without Spring Boot](#oauth2resourceserver-jwt-sansboot "12.3.4 Overriding or Replacing Boot Auto Configuration")

## 3 Specifying the Authorization Server JWK Set Uri Directly

If the authorization server doesn’t support any configuration endpoints, or if Resource Server must be able to start up independently from the authorization server, then the `jwk-set-uri` can be supplied as well:

```yml
spring:
 security:
 oauth2:
 resourceserver:
 jwt:
 issuer-uri: https://idp.example.com
 jwk-set-uri: https://idp.example.com/.well-known/jwks.json
```

> The JWK Set uri is not standardized, but can typically be found in the authorization server’s documentation

Consequently, Resource Server will not ping the authorization server at startup. We still specify the `issuer-uri` so that Resource Server still validates the `iss` claim on incoming JWTs.

> This property can also be supplied directly on the [DSL](#oauth2resourceserver-jwt-jwkseturi-dsl "Using jwkSetUri()").

## 4 Overriding or Replacing Boot Auto Configuration

There are two `@Bean` s that Spring Boot generates on Resource Server’s behalf. The first is a `WebSecurityConfigurerAdapter` that configures the app as a resource server. When including `spring-security-oauth2-jose`, this `WebSecurityConfigurerAdapter` looks like:

```java
protected void configure(HttpSecurity http) {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
}
```

If the application doesn’t expose a `WebSecurityConfigurerAdapter` bean, then Spring Boot will expose the above default one. Replacing this is as simple as exposing the bean within the application:

```java
@EnableWebSecurity
public class MyCustomSecurityConfiguration extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_message:read")
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwtAuthenticationConverter(myConverter());
    }
}
```

The above requires the scope of `message:read` for any URL that starts with `/messages/`. Methods on the `oauth2ResourceServer` DSL will also override or replace auto configuration. For example, the second `@Bean` Spring Boot creates is a `JwtDecoder`, which decodes `String` tokens into validated instances of `Jwt`:

```java
@Bean
public JwtDecoder jwtDecoder() {
    return JwtDecoders.fromIssuerLocation(issuerUri);
}
```

> Calling [`JwtDecoders#fromIssuerLocation`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/jwt/JwtDecoders.html#fromIssuerLocation-java.lang.String-) is what invokes the Provider Configuration or Authorization Server Metadata endpoint in order to derive the JWK Set Uri.

If the application doesn’t expose a `JwtDecoder` bean, then Spring Boot will expose the above default one. And its configuration can be overridden using `jwkSetUri()` or replaced using `decoder()`.

### Using `jwkSetUri()`

An authorization server’s JWK Set Uri can be configured [as a configuration property](#oauth2resourceserver-jwt-jwkseturi "12.3.3 Specifying the Authorization Server JWK Set Uri Directly") or it can be supplied in the DSL:

```java
@EnableWebSecurity
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwkSetUri("https://idp.example.com/.well-known/jwks.json");
    }
}
```

Using `jwkSetUri()` takes precedence over any configuration property.

### Using `decoder()`

More powerful than `jwkSetUri()` is `decoder()`, which will completely replace any Boot auto configuration of `JwtDecoder`:

```java
@EnableWebSecurity
public class DirectlyConfiguredJwtDecoder extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .decoder(myCustomDecoder());
    }
}
```

This is handy when deeper configuration, like [validation](#oauth2resourceserver-jwt-validation "12.3.9 Configuring Validation"), [mapping](#oauth2resourceserver-jwt-claimsetmapping "12.3.10 Configuring Claim Set Mapping"), or [request timeouts](#oauth2resourceserver-jwt-timeouts "12.3.11 Configuring Timeouts"), is necessary.

### Exposing a `JwtDecoder` `@Bean`

Or, exposing a `JwtDecoder` `@Bean` has the same effect as `decoder()`:

```java
@Bean
public JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
}
```

## 5 Configuring Trusted Algorithms

By default, `NimbusJwtDecoder`, and hence Resource Server, will only trust and verify tokens using `RS256`. You can customize this via [Spring Boot](#oauth2resourceserver-jwt-boot-algorithm "Via Spring Boot"), [the NimbusJwtDecoder builder](#oauth2resourceserver-jwt-decoder-builder "Using a Builder"), or from the [JWK Set response](#oauth2resourceserver-jwt-decoder-jwk-response "From JWK Set response").

### Via Spring Boot

The simplest way to set the algorithm is as a property:

```yml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jws-algorithm: RS512
          jwk-set-uri: https://idp.example.org/.well-known/jwks.json
```

### Using a Builder

For greater power, though, we can use a builder that ships with `NimbusJwtDecoder`:

```java
@Bean
JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.fromJwkSetUri(this.jwkSetUri)
            .jwsAlgorithm(RS512).build();
}
```

Calling `jwsAlgorithm` more than once will configure `NimbusJwtDecoder` to trust more than one algorithm, like so:

```java
@Bean
JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.fromJwkSetUri(this.jwkSetUri)
            .jwsAlgorithm(RS512).jwsAlgorithm(EC512).build();
}
```

Or, you can call `jwsAlgorithms`:

```java
@Bean
JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.fromJwkSetUri(this.jwkSetUri)
            .jwsAlgorithms(algorithms -> {
                    algorithms.add(RS512);
                    algorithms.add(EC512);
            }).build();
}
```

### From JWK Set response

Since Spring Security’s JWT support is based off of Nimbus, you can use all it’s great features as well. For example, Nimbus has a `JWSKeySelector` implementation that will select the set of algorithms based on the JWK Set URI response. You can use it to generate a `NimbusJwtDecoder` like so:

```java
@Bean
public JwtDecoder jwtDecoder() {
    // makes a request to the JWK Set endpoint
    JWSKeySelector <securitycontext>jwsKeySelector =
            JWSAlgorithmFamilyJWSKeySelector.fromJWKSetURL(this.jwkSetUrl);

    DefaultJWTProcessor <securitycontext>jwtProcessor =
            new DefaultJWTProcessor<>();
    jwtProcessor.setJWSKeySelector(jwsKeySelector);

    return new NimbusJwtDecoder(jwtProcessor);
}</securitycontext></securitycontext>
```

## 6 Trusting a Single Asymmetric Key

Simpler than backing a Resource Server with a JWK Set endpoint is to hard-code an RSA public key. The public key can be provided via [Spring Boot](#oauth2resourceserver-jwt-decoder-public-key-boot "Via Spring Boot") or by [Using a Builder](#oauth2resourceserver-jwt-decoder-public-key-builder "Using a Builder").

### Via Spring Boot

Specifying a key via Spring Boot is quite simple. The key’s location can be specified like so:

```
spring:
 security:
 oauth2:
 resourceserver:
 jwt:
 public-key-location: classpath:my-key.pub
```

Or, to allow for a more sophisticated lookup, you can post-process the `RsaKeyConversionServicePostProcessor`:

```java
@Bean
BeanFactoryPostProcessor conversionServiceCustomizer() {
    return beanFactory ->
        beanFactory.getBean(RsaKeyConversionServicePostProcessor.class)
                .setResourceLoader(new CustomResourceLoader());
}
```

Specify your key’s location:

```
key.location: hfds://my-key.pub
```

And then autowire the value:

```java
@Value("${key.location}")
RSAPublicKey key;
```

### Using a Builder

To wire an `RSAPublicKey` directly, you can simply use the appropriate `NimbusJwtDecoder` builder, like so:

```java
@Bean
public JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withPublicKey(this.key).build();
}
```

## 7 Trusting a Single Symmetric Key

Using a single symmetric key is also simple. You can simply load in your `SecretKey` and use the appropriate `NimbusJwtDecoder` builder, like so:

```java
@Bean
public JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withSecretKey(this.key).build();
}
```

## 8 Configuring Authorization

A JWT that is issued from an OAuth 2.0 Authorization Server will typically either have a `scope` or `scp` attribute, indicating the scopes (or authorities) it’s been granted, for example: `{ …​, "scope" : "messages contacts"}` When this is the case, Resource Server will attempt to coerce these scopes into a list of granted authorities, prefixing each scope with the string "SCOPE_". This means that to protect an endpoint or method with a scope derived from a JWT, the corresponding expressions should include this prefix:

```java
@EnableWebSecurity
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests(authorizeRequests -> authorizeRequests
                .mvcMatchers("/contacts/**").hasAuthority("SCOPE_contacts")
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_messages")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
    }
}
```

Or similarly with method security:

```java
@PreAuthorize("hasAuthority('SCOPE_messages')")
public List <message>getMessages(...) {}</message>
```

### Extracting Authorities Manually

However, there are a number of circumstances where this default is insufficient. For example, some authorization servers don’t use the `scope` attribute, but instead have their own custom attribute. Or, at other times, the resource server may need to adapt the attribute or a composition of attributes into internalized authorities. To this end, the DSL exposes `jwtAuthenticationConverter()`:

```java
@EnableWebSecurity
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwtAuthenticationConverter(grantedAuthoritiesExtractor());
    }
}

Converter<Jwt, AbstractAuthenticationToken> grantedAuthoritiesExtractor() {
    JwtAuthenticationConverter jwtAuthenticationConverter =
            new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter
            (new GrantedAuthoritiesExtractor());
    return jwtAuthenticationConveter;
}
```

which is responsible for converting a `Jwt` into an `Authentication`. As part of its configuration, we can supply a subsidiary converter to go from `Jwt` to a `Collection` of granted authorities. That final converter might be something like `GrantedAuthoritiesExtractor` below:

```java
static class GrantedAuthoritiesExtractor
        implements Converter<Jwt, Collection<GrantedAuthority>> {

    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<String> authorities = (Collection<String>)
                jwt.getClaims().get("mycustomclaim");

        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
```

For more flexibility, the DSL supports entirely replacing the converter with any class that implements `Converter<jwt, abstractauthenticationtoken="">`:

```java
static class CustomAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    public AbstractAuthenticationToken convert(Jwt jwt) {
        return new CustomAuthenticationToken(jwt);
    }
}
```

## 9 Configuring Validation

Using [minimal Spring Boot configuration](#oauth2resourceserver-jwt-minimalconfiguration "12.3.2 Minimal Configuration for JWTs"), indicating the authorization server’s issuer uri, Resource Server will default to verifying the `iss` claim as well as the `exp` and `nbf` timestamp claims. In circumstances where validation needs to be customized, Resource Server ships with two standard validators and also accepts custom `OAuth2TokenValidator` instances.

### Customizing Timestamp Validation

JWT’s typically have a window of validity, with the start of the window indicated in the `nbf` claim and the end indicated in the `exp` claim. However, every server can experience clock drift, which can cause tokens to appear expired to one server, but not to another. This can cause some implementation heartburn as the number of collaborating servers increases in a distributed system. Resource Server uses `JwtTimestampValidator` to verify a token’s validity window, and it can be configured with a `clockSkew` to alleviate the above problem:

```java
@Bean
JwtDecoder jwtDecoder() {
     NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
             JwtDecoders.fromIssuerLocation(issuerUri);

     OAuth2TokenValidator<Jwt> withClockSkew = new DelegatingOAuth2TokenValidator<>(
            new JwtTimestampValidator(Duration.ofSeconds(60)),
            new IssuerValidator(issuerUri));

     jwtDecoder.setJwtValidator(withClockSkew);

     return jwtDecoder;
}
```

> By default, Resource Server configures a clock skew of 30 seconds.

### Configuring a Custom Validator

Adding a check for the `aud` claim is simple with the `OAuth2TokenValidator` API:

```java
public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);

    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        if (jwt.getAudience().contains("messaging")) {
            return OAuth2TokenValidatorResult.success();
        } else {
            return OAuth2TokenValidatorResult.failure(error);
        }
    }
}
```

Then, to add into a resource server, it’s a matter of specifying the `JwtDecoder` instance:

```java
@Bean
JwtDecoder jwtDecoder() {
    NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
        JwtDecoders.fromIssuerLocation(issuerUri);

    OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator();
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

    jwtDecoder.setJwtValidator(withAudience);

    return jwtDecoder;
}
```

## 10 Configuring Claim Set Mapping

Spring Security uses the [Nimbus](https://bitbucket.org/connect2id/nimbus-jose-jwt/wiki/Home) library for parsing JWTs and validating their signatures. Consequently, Spring Security is subject to Nimbus’s interpretation of each field value and how to coerce each into a Java type. For example, because Nimbus remains Java 7 compatible, it doesn’t use `Instant` to represent timestamp fields. And it’s entirely possible to use a different library or for JWT processing, which may make its own coercion decisions that need adjustment. Or, quite simply, a resource server may want to add or remove claims from a JWT for domain-specific reasons. For these purposes, Resource Server supports mapping the JWT claim set with `MappedJwtClaimSetConverter`.

### Customizing the Conversion of a Single Claim

By default, `MappedJwtClaimSetConverter` will attempt to coerce claims into the following types:

| Claim | Java Type |
| ---- | ---- |
| `aud` | `Collection` |
| `exp` | `Instant` |
| `iat` | `Instant` |
| `iss` | `String` |
| `jti` | `String` |
| `nbf` | `Instant` |
| `sub` | `String` |

An individual claim’s conversion strategy can be configured using `MappedJwtClaimSetConverter.withDefaults`:

```java
@Bean
JwtDecoder jwtDecoder() {
    NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();

    MappedJwtClaimSetConverter converter = MappedJwtClaimSetConverter
            .withDefaults(Collections.singletonMap("sub", this::lookupUserIdBySub));
    jwtDecoder.setClaimSetConverter(converter);

    return jwtDecoder;
}
```

This will keep all the defaults, except it will override the default claim converter for `sub`.

### Adding a Claim

`MappedJwtClaimSetConverter` can also be used to add a custom claim, for example, to adapt to an existing system:

```java
MappedJwtClaimSetConverter.withDefaults(Collections.singletonMap("custom", custom -> "value"));
```

### Removing a Claim

And removing a claim is also simple, using the same API:

```java
MappedJwtClaimSetConverter.withDefaults(Collections.singletonMap("legacyclaim", legacy -> null));
```

### Renaming a Claim

In more sophisticated scenarios, like consulting multiple claims at once or renaming a claim, Resource Server accepts any class that implements `Converter<map<string, object="">, Map<string,object>>`:

```java
public class UsernameSubClaimAdapter implements Converter<Map<String, Object>, Map<String, Object>> {
    private final MappedJwtClaimSetConverter delegate =
            MappedJwtClaimSetConverter.withDefaults(Collections.emptyMap());

    public Map<String, Object> convert(Map<String, Object> claims) {
        Map<String, Object> convertedClaims = this.delegate.convert(claims);

        String username = (String) convertedClaims.get("user_name");
        convertedClaims.put("sub", username);

        return convertedClaims;
    }
}
```

And then, the instance can be supplied like normal:

```java
@Bean
JwtDecoder jwtDecoder() {
    NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
    jwtDecoder.setClaimSetConverter(new UsernameSubClaimAdapter());
    return jwtDecoder;
}
```

## 11 Configuring Timeouts

By default, Resource Server uses connection and socket timeouts of 30 seconds each for coordinating with the authorization server. This may be too short in some scenarios. Further, it doesn’t take into account more sophisticated patterns like back-off and discovery. To adjust the way in which Resource Server connects to the authorization server, `NimbusJwtDecoder` accepts an instance of `RestOperations`:

```java
@Bean
public JwtDecoder jwtDecoder(RestTemplateBuilder builder) {
    RestOperations rest = builder
            .setConnectionTimeout(60000)
            .setReadTimeout(60000)
            .build();

    NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).restOperations(rest).build();
    return jwtDecoder;
}
```

## 12 Minimal Configuration for Introspection

Typically, an opaque token can be verified via an [OAuth 2.0 Introspection Endpoint](https://tools.ietf.org/html/rfc7662), hosted by the authorization server. This can be handy when revocation is a requirement. When using [Spring Boot](https://spring.io/projects/spring-boot), configuring an application as a resource server that uses introspection consists of two basic steps. First, include the needed dependencies and second, indicate the introspection endpoint details.

### Specifying the Authorization Server

To specify where the introspection endpoint is, simply do:

```yml
security:
 oauth2:
 resourceserver:
 opaque-token:
 introspection-uri: https://idp.example.com/introspect
 client-id: client
 client-secret: secret
```

Where [`https://idp.example.com/introspect`](https://idp.example.com/introspect) is the introspection endpoint hosted by your authorization server and `client-id` and `client-secret` are the credentials needed to hit that endpoint. Resource Server will use these properties to further self-configure and subsequently validate incoming JWTs.

> When using introspection, the authorization server’s word is the law. If the authorization server responses that the token is valid, then it is.

And that’s it!

### Startup Expectations

When this property and these dependencies are used, Resource Server will automatically configure itself to validate Opaque Bearer Tokens. This startup process is quite a bit simpler than for JWTs since no endpoints need to be discovered and no additional validation rules get added.

### Runtime Expectations

Once the application is started up, Resource Server will attempt to process any request containing an `Authorization: Bearer` header:

```
GET / HTTP/1.1
Authorization: Bearer some-token-value # Resource Server will process this
```

So long as this scheme is indicated, Resource Server will attempt to process the request according to the Bearer Token specification. Given an Opaque Token, Resource Server will

1. Query the provided introspection endpoint using the provided credentials and the token 
2. Inspect the response for an `{ 'active' : true }` attribute 
3. Map each scope to an authority with the prefix `SCOPE_`

The resulting `Authentication#getPrincipal`, by default, is a Spring Security [`OAuth2AuthenticatedPrincipal`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/OAuth2AuthenticatedPrincipal.html) object, and `Authentication#getName` maps to the token’s `sub` property, if one is present. From here, you may want to jump to:

* [Looking Up Attributes Post-Authentication](#oauth2resourceserver-opaque-attributes "12.3.13 Looking Up Attributes Post-Authentication") 
* [Extracting Authorities Manually](#oauth2resourceserver-opaque-authorization-extraction "Extracting Authorities Manually") 
* [Using Introspection with JWTs](#oauth2resourceserver-opaque-jwt-introspector "12.3.17 Using Introspection with JWTs")

## 13 Looking Up Attributes Post-Authentication

Once a token is authenticated, an instance of `BearerTokenAuthentication` is set in the `SecurityContext`. This means that it’s available in `@Controller` methods when using `@EnableWebMvc` in your configuration:

```java
@GetMapping("/foo")
public String foo(BearerTokenAuthentication authentication) {
    return authentication.getTokenAttributes().get("sub") + " is the subject";
}
```

Since `BearerTokenAuthentication` holds an `OAuth2AuthenticatedPrincipal`, that also means that it’s available to controller methods, too:

```java
@GetMapping("/foo")
public String foo(@AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
    return principal.getAttribute("sub") + " is the subject";
}
```

### Looking Up Attributes Via SpEL

Of course, this also means that attributes can be accessed via SpEL. For example, if using `@EnableGlobalMethodSecurity` so that you can use `@PreAuthorize` annotations, you can do:

```java
@PreAuthorize("principal?.attributes['sub'] == 'foo'")
public String forFoosEyesOnly() {
    return "foo";
}
```

## 14 Overriding or Replacing Boot Auto Configuration

There are two `@Bean` s that Spring Boot generates on Resource Server’s behalf. The first is a `WebSecurityConfigurerAdapter` that configures the app as a resource server. When use Opaque Token, this `WebSecurityConfigurerAdapter` looks like:

```java
protected void configure(HttpSecurity http) {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .oauth2ResourceServer(OAuth2ResourceServerConfigurer::opaqueToken)
}
```

If the application doesn’t expose a `WebSecurityConfigurerAdapter` bean, then Spring Boot will expose the above default one. Replacing this is as simple as exposing the bean within the application:

```java
@EnableWebSecurity
public class MyCustomSecurityConfiguration extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_message:read")
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .opaqueToken()
                    .introspector(myIntrospector());
    }
}
```

The above requires the scope of `message:read` for any URL that starts with `/messages/`. Methods on the `oauth2ResourceServer` DSL will also override or replace auto configuration. For example, the second `@Bean` Spring Boot creates is an `OpaqueTokenIntrospector`, which decodes `String` tokens into validated instances of `OAuth2AuthenticatedPrincipal`:

```java
@Bean
public OpaqueTokenIntrospector introspector() {
    return new NimbusOpaqueTokenIntrospector(introspectionUri, clientId, clientSecret);
}
```

If the application doesn’t expose a `OpaqueTokenIntrospector` bean, then Spring Boot will expose the above default one. And its configuration can be overridden using `introspectionUri()` and `introspectionClientCredentials()` or replaced using `introspector()`.

### Using `introspectionUri()`

An authorization server’s Introspection Uri can be configured [as a configuration property](#) or it can be supplied in the DSL:

```java
@EnableWebSecurity
public class DirectlyConfiguredIntrospectionUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .opaqueToken()
                    .introspectionUri("https://idp.example.com/introspect")
                    .introspectionClientCredentials("client", "secret");
    }
}
```

Using `introspectionUri()` takes precedence over any configuration property.

### Using `introspector()`

More powerful than `introspectionUri()` is `introspector()`, which will completely replace any Boot auto configuration of `OpaqueTokenIntrospector`:

```java
@EnableWebSecurity
public class DirectlyConfiguredIntrospector extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .opaqueToken()
                    .introspector(myCustomIntrospector());
    }
}
```

This is handy when deeper configuration, like [authority mapping](#oauth2resourceserver-opaque-authorization-extraction "Extracting Authorities Manually"), [JWT revocation](#oauth2resourceserver-opaque-jwt-introspector "12.3.17 Using Introspection with JWTs"), or [request timeouts](#oauth2resourceserver-opaque-timeouts "12.3.16 Configuring Timeouts"), is necessary.

### Exposing a `OpaqueTokenIntrospector` `@Bean`

Or, exposing a `OpaqueTokenIntrospector` `@Bean` has the same effect as `introspector()`:

```java
@Bean
public OpaqueTokenIntrospector introspector() {
    return new NimbusOpaqueTokenIntrospector(introspectionUri, clientId, clientSecret);
}
```

## 15 Configuring Authorization

An OAuth 2.0 Introspection endpoint will typically return a `scope` attribute, indicating the scopes (or authorities) it’s been granted, for example: `{ …​, "scope" : "messages contacts"}` When this is the case, Resource Server will attempt to coerce these scopes into a list of granted authorities, prefixing each scope with the string "SCOPE_". This means that to protect an endpoint or method with a scope derived from an Opaque Token, the corresponding expressions should include this prefix:

```java
@EnableWebSecurity
public class MappedAuthorities extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests(authorizeRequests -> authorizeRequests
                .mvcMatchers("/contacts/**").hasAuthority("SCOPE_contacts")
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_messages")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::opaqueToken);
    }
}
```

Or similarly with method security:

```java
@PreAuthorize("hasAuthority('SCOPE_messages')")
public List<Message> getMessages(...) {}
```

### Extracting Authorities Manually

By default, Opaque Token support will extract the scope claim from an introspection response and parse it into individual `GrantedAuthority` instances. For example, if the introspection response were:

```json
{
    "active" : true,
    "scope" : "message:read message:write"
}
```

Then Resource Server would generate an `Authentication` with two authorities, one for `message:read` and the other for `message:write`. This can, of course, be customized using a custom `OpaqueTokenIntrospector` that takes a look at the attribute set and converts in its own way:

```java
public class CustomAuthoritiesOpaqueTokenIntrospector implements OpaqueTokenIntrospector {
    private OpaqueTokenIntrospector delegate =
            new NimbusOpaqueTokenIntrospector("https://idp.example.org/introspect", "client", "secret");

    public OAuth2AuthenticatedPrincipal introspect(String token) {
        OAuth2AuthenticatedPrincipal principal = this.delegate.introspect(token);
        return new DefaultOAuth2AuthenticatedPrincipal(
                principal.getName(), principal.getAttributes(), extractAuthorities(principal));
    }

    private Collection<GrantedAuthority> extractAuthorities(OAuth2AuthenticatedPrincipal principal) {
        List<String> scopes = principal.getAttribute(OAuth2IntrospectionClaimNames.SCOPE);
        return scopes.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
```

Thereafter, this custom introspector can be configured simply by exposing it as a `@Bean`:

```java
@Bean
public OpaqueTokenIntrospector introspector() {
    return new CustomAuthoritiesOpaqueTokenIntrospector();
}
```

## 16 Configuring Timeouts

By default, Resource Server uses connection and socket timeouts of 30 seconds each for coordinating with the authorization server. This may be too short in some scenarios. Further, it doesn’t take into account more sophisticated patterns like back-off and discovery. To adjust the way in which Resource Server connects to the authorization server, `NimbusOpaqueTokenIntrospector` accepts an instance of `RestOperations`:

```java
@Bean
public OpaqueTokenIntrospector introspector(RestTemplateBuilder builder) {
    RestOperations rest = builder
            .basicAuthentication(clientId, clientSecret)
            .setConnectionTimeout(60000)
            .setReadTimeout(60000)
            .build();

    return new NimbusOpaqueTokenIntrospector(introspectionUri, rest);
}
```

## 17 Using Introspection with JWTs

A common question is whether or not introspection is compatible with JWTs. Spring Security’s Opaque Token support has been designed to not care about the format of the token — it will gladly pass any token to the introspection endpoint provided. So, let’s say that you’ve got a requirement that requires you to check with the authorization server on each request, in case the JWT has been revoked. Even though you are using the JWT format for the token, your validation method is introspection, meaning you’d want to do:

```yml
spring:
 security:
 oauth2:
 resourceserver:
 opaque-token:
 introspection-uri: https://idp.example.org/introspection
 client-id: client
 client-secret: secret
```

In this case, the resulting `Authentication` would be `BearerTokenAuthentication`. Any attributes in the corresponding `OAuth2AuthenticatedPrincipal` would be whatever was returned by the introspection endpoint. But, let’s say that, oddly enough, the introspection endpoint only returns whether or not the token is active. Now what? In this case, you can create a custom `OpaqueTokenIntrospector` that still hits the endpoint, but then updates the returned principal to have the JWTs claims as the attributes:

```java
public class JwtOpaqueTokenIntrospector implements OpaqueTokenIntrospector {
    private OpaqueTokenIntrospector delegate =
            new NimbusOpaqueTokenIntrospector("https://idp.example.org/introspect", "client", "secret");
    private JwtDecoder jwtDecoder = new NimbusJwtDecoder(new ParseOnlyJWTProcessor());

    public OAuth2AuthenticatedPrincipal introspect(String token) {
        OAuth2AuthenticatedPrincipal principal = this.delegate.introspect(token);
        try {
            Jwt jwt = this.jwtDecoder.decode(token);
            return new DefaultOAuth2AuthenticatedPrincipal(jwt.getClaims(), NO_AUTHORITIES);
        } catch (JwtException e) {
            throw new OAuth2IntrospectionException(e);
        }
    }

    private static class ParseOnlyJWTProcessor extends DefaultJWTProcessor<SecurityContext> {
        JWTClaimsSet process(SignedJWT jwt, SecurityContext context)
                throws JOSEException {
            return jwt.getJWTClaimSet();
        }
    }
}
```

Thereafter, this custom introspector can be configured simply by exposing it as a `@Bean`:

```java
@Bean
public OpaqueTokenIntrospector introspector() {
    return new JwtOpaqueTokenIntropsector();
}
```

## 18 Calling a `/userinfo` Endpoint

Generally speaking, a Resource Server doesn’t care about the underlying user, but instead about the authorities that have been granted. That said, at times it can be valuable to tie the authorization statement back to a user. If an application is also using `spring-security-oauth2-client`, having set up the appropriate `ClientRegistrationRepository`, then this is quite simple with a custom `OpaqueTokenIntrospector`. This implementation below does three things:

* Delegates to the introspection endpoint, to affirm the token’s validity 
* Looks up the appropriate client registration associated with the `/userinfo` endpoint 
* Invokes and returns the response from the `/userinfo` endpoint

```java
public class UserInfoOpaqueTokenIntrospector implements OpaqueTokenIntrospector {
    private final OpaqueTokenIntrospector delegate =
            new NimbusOpaqueTokenIntrospector("https://idp.example.org/introspect", "client", "secret");
    private final OAuth2UserService oauth2UserService = new DefaultOAuth2UserService();

    private final ClientRegistrationRepository repository;

    // ... constructor

    @Override
    public OAuth2AuthenticatedPrincipal introspect(String token) {
        OAuth2AuthenticatedPrincipal authorized = this.delegate.introspect(token);
        Instant issuedAt = authorized.getAttribute(ISSUED_AT);
        Instant expiresAt = authorized.getAttribute(EXPIRES_AT);
        ClientRegistration clientRegistration = this.repository.findByRegistrationId("registration-id");
        OAuth2AccessToken token = new OAuth2AccessToken(BEARER, token, issuedAt, expiresAt);
        OAuth2UserRequest oauth2UserRequest = new OAuth2UserRequest(clientRegistration, token);
        return this.oauth2UserService.loadUser(oauth2UserRequest);
    }
}
```

If you aren’t using `spring-security-oauth2-client`, it’s still quite simple. You will simply need to invoke the `/userinfo` with your own instance of `WebClient`:

```java
public class UserInfoOpaqueTokenIntrospector implements OpaqueTokenIntrospector {
    private final OpaqueTokenIntrospector delegate =
            new NimbusOpaqueTokenIntrospector("https://idp.example.org/introspect", "client", "secret");
    private final WebClient rest = WebClient.create();

    @Override
    public OAuth2AuthenticatedPrincipal introspect(String token) {
        OAuth2AuthenticatedPrincipal authorized = this.delegate.introspect(token);
        return makeUserInfoRequest(authorized);
    }
}
```

Either way, having created your `OpaqueTokenIntrospector`, you should publish it as a `@Bean` to override the defaults:

```java
@Bean
OpaqueTokenIntrospector introspector() {
    return new UserInfoOpaqueTokenIntrospector(...);
}
```

## 19 Supporting both JWT and Opaque Token

In some cases, you may have a need to access both kinds of tokens. For example, you may support more than one tenant where one tenant issues JWTs and the other issues opaque tokens. If this decision must be made at request-time, then you can use an `AuthenticationManagerResolver` to achieve it, like so:

```java
@Bean
AuthenticationManagerResolver<HttpServletRequest> tokenAuthenticationManagerResolver() {
    BearerTokenResolver bearerToken = new DefaultBearerTokenResolver();
    JwtAuthenticationProvider jwt = jwt();
    OpaqueTokenAuthenticationProvider opaqueToken = opaqueToken();

    return request -> {
        String token = bearerToken.resolve(request);
        if (isAJwt(token)) {
            return jwt::authenticate;
        } else {
            return opaqueToken::authenticate;
        }
    }
}
```

And then specify this `AuthenticationManagerResolver` in the DSL:

```java
http
    .authorizeRequests()
        .anyRequest().authenticated()
        .and()
    .oauth2ResourceServer()
        .authenticationManagerResolver(this.tokenAuthenticationManagerResolver);
```

## 20 Multi-tenancy

A resource server is considered multi-tenant when there are multiple strategies for verifying a bearer token, keyed by some tenant identifier. For example, your resource server may accept bearer tokens from two different authorization servers. Or, your authorization server may represent a multiplicity of issuers. In each case, there are two things that need to be done and trade-offs associated with how you choose to do them:

1. Resolve the tenant
2. Propagate the tenant

### Resolving the Tenant By Request Material

Resolving the tenant by request material can be done my implementing an `AuthenticationManagerResolver`, which determines the `AuthenticationManager` at runtime, like so:

```java
@Component
public class TenantAuthenticationManagerResolver
        implements AuthenticationManagerResolver<HttpServletRequest> {
    private final BearerTokenResolver resolver = new DefaultBearerTokenResolver();
    private final TenantRepository tenants; // 1

    private final Map<String, AuthenticationManager> authenticationManagers = new ConcurrentHashMap<>(); // 2

    public TenantAuthenticationManagerResolver(TenantRepository tenants) {
        this.tenants = tenants;
    }

    @Override
    public AuthenticationManager resolve(HttpServletRequest request) {
        return this.authenticationManagers.computeIfAbsent(toTenant(request), this::fromTenant);
    }

    private String toTenant(HttpServletRequest request) {
        String[] pathParts = request.getRequestURI().split("/");
        return pathParts.length > 0 ? pathParts[1] : null;
    }

    private AuthenticationManager fromTenant(String tenant) {
        return Optional.ofNullable(this.tenants.get(tenant)) // 3
                .map(JwtDecoders::fromIssuerLocation) // 4
                .map(JwtAuthenticationProvider::new)
                .orElseThrow(() -> new IllegalArgumentException("unknown tenant"))::authenticate;
    }
}
```

1. A hypothetical source for tenant information
2. A cache for `AuthenticationManager`s, keyed by tenant identifier
3. Looking up the tenant is more secure than simply computing the issuer location on the fly - the lookup acts as a tenant whitelist
4. Create a JwtDecoder via the discovery endpoint - the lazy lookup here means that you don’t need to configure all tenants at startup

And then specify this `AuthenticationManagerResolver` in the DSL:

```java
http
    .authorizeRequests()
        .anyRequest().authenticated()
        .and()
    .oauth2ResourceServer()
        .authenticationManagerResolver(this.tenantAuthenticationManagerResolver);
```

### Resolving the Tenant By Claim

Resolving the tenant by claim is similar to doing so by request material. The only real difference is the `toTenant` method implementation:

```java
@Component
public class TenantAuthenticationManagerResolver implements AuthenticationManagerResolver<HttpServletRequest> {
    private final BearerTokenResolver resolver = new DefaultBearerTokenResolver();
    private final TenantRepository tenants; // 1

    private final Map<String, AuthenticationManager> authenticationManagers = new ConcurrentHashMap<>(); // 2

    public TenantAuthenticationManagerResolver(TenantRepository tenants) {
        this.tenants = tenants;
    }

    @Override
    public AuthenticationManager resolve(HttpServletRequest request) {
        return this.authenticationManagers.computeIfAbsent(toTenant(request), this::fromTenant); // 3
    }

    private String toTenant(HttpServletRequest request) {
        try {
            String token = this.resolver.resolve(request);
            return (String) JWTParser.parse(token).getJWTClaimsSet().getIssuer();
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }

    private AuthenticationManager fromTenant(String tenant) {
        return Optional.ofNullable(this.tenants.get(tenant)) // 4
                .map(JwtDecoders::fromIssuerLocation) // 5
                .map(JwtAuthenticationProvider::new)
                .orElseThrow(() -> new IllegalArgumentException("unknown tenant"))::authenticate;
    }
}
```

|  |  |  |
| ---- | ---- | ---- |
| [![1](images/1.png)](#CO14-1) |  | A hypothetical source for tenant information |
| [![1](images/2.png)](#CO14-2) |  | A cache for `AuthenticationManager`s, keyed by tenant identifier |
| [![1](images/3.png)](#CO14-3) | [![1](images/4.png)](#CO14-4) | Looking up the tenant is more secure than simply computing the issuer location on the fly - the lookup acts as a tenant whitelist |
| [![1](images/5.png)](#CO14-5) |  | Create a `JwtDecoder` via the discovery endpoint - the lazy lookup here means that you don’t need to configure all tenants at startup |

```java
http
    .authorizeRequests()
        .anyRequest().authenticated()
        .and()
    .oauth2ResourceServer()
        .authenticationManagerResolver(this.tenantAuthenticationManagerResolver);
```

### Parsing the Claim Only Once

You may have observed that this strategy, while simple, comes with the trade-off that the JWT is parsed once by the `AuthenticationManagerResolver` and then again by the `JwtDecoder`. This extra parsing can be alleviated by configuring the `JwtDecoder` directly with a `JWTClaimSetAwareJWSKeySelector` from Nimbus:

```java
@Component
public class TenantJWSKeySelector
    implements JWTClaimSetAwareJWSKeySelector<SecurityContext> {

    private final TenantRepository tenants; 1
    private final Map<String, JWSKeySelector<SecurityContext>> selectors = new ConcurrentHashMap<>(); 2

    public TenantJWSKeySelector(TenantRepository tenants) {
        this.tenants = tenants;
    }

    @Override
    public List<? extends Key> selectKeys(JWSHeader jwsHeader, JWTClaimsSet jwtClaimsSet, SecurityContext securityContext)
            throws KeySourceException {
        return this.selectors.computeIfAbsent(toTenant(jwtClaimsSet), this::fromTenant)
                .selectJWSKeys(jwsHeader, securityContext);
    }

    private String toTenant(JWTClaimsSet claimSet) {
        return (String) claimSet.getClaim("iss");
    }

    private JWSKeySelector<SecurityContext> fromTenant(String tenant) {
        return Optional.ofNullable(this.tenantRepository.findById(tenant)) 3
                .map(t -> t.getAttrbute("jwks_uri"))
                .map(this::fromUri)
                .orElseThrow(() -> new IllegalArgumentException("unknown tenant"));
    }

    private JWSKeySelector<SecurityContext> fromUri(String uri) {
        try {
            return JWSAlgorithmFamilyJWSKeySelector.fromJWKSetURL(new URL(uri)); 4
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }
}
```

|  |  |  |
| ---- | ---- | ---- |
| [![1](images/1.png)](#CO14-1) | A hypothetical source for tenant information |
| [![1](images/2.png)](#CO14-2) | A cache for `JWKKeySelector`s, keyed by tenant identifier |
| [![1](images/3.png)](#CO14-3) | Looking up the tenant is more secure than simply calculating the JWK Set endpoint on the fly - the lookup acts as a tenant whitelist |
| [![1](images/4.png)](#CO14-4) | Create a `JWSKeySelector` via the types of keys that come back from the JWK Set endpoint - the lazy lookup here means that you don’t need to configure all tenants at startupp |

The above key selector is a composition of many key selectors. It chooses which key selector to use based on the `iss` claim in the JWT.

> To use this approach, make sure that the authorization server is configured to include the claim set as part of the token’s signature. Without this, you have no guarantee that the issuer hasn’t been altered by a bad actor.

Next, we can construct a `JWTProcessor`:

```java
@Bean
JWTProcessor jwtProcessor(JWTClaimSetJWSKeySelector keySelector) {
    ConfigurableJWTProcessor<SecurityContext> jwtProcessor =
            new DefaultJWTProcessor();
    jwtProcessor.setJWTClaimSetJWSKeySelector(keySelector);
    return jwtProcessor;
}
```

As you are already seeing, the trade-off for moving tenant-awareness down to this level is more configuration. We have just a bit more. Next, we still want to make sure you are validating the issuer. But, since the issuer may be different per JWT, then you’ll need a tenant-aware validator, too:

```java
@Component
public class TenantJwtIssuerValidator implements OAuth2TokenValidator<Jwt> {
    private final TenantRepository tenants;
    private final Map<String, JwtIssuerValidator> validators = new ConcurrentHashMap<>();

    public TenantJwtIssuerValidator(TenantRepository tenants) {
        this.tenants = tenants;
    }

    @Override
    public OAuth2TokenValidatorResult validate(Jwt token) {
        return this.validators.computeIfAbsent(toTenant(token), this::fromTenant)
                .validate(token);
    }

    private String toTenant(Jwt jwt) {
        return jwt.getIssuer();
    }

    private JwtIssuerValidator fromTenant(String tenant) {
        return Optional.ofNullable(this.tenants.findById(tenant))
                .map(t -> t.getAttribute("issuer"))
                .map(JwtIssuerValidator::new)
                .orElseThrow(() -> new IllegalArgumentException("unknown tenant"));
    }
}
```

Now that we have a tenant-aware processor and a tenant-aware validator, we can proceed with creating our `JwtDecoder`:

```java
@Bean
JwtDecoder jwtDecoder(JWTProcessor jwtProcessor, OAuth2TokenValidator<Jwt> jwtValidator) {
    NimbusJwtDecoder decoder = new NimbusJwtDecoder(processor);
    OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>
            (JwtValidators.createDefault(), this.jwtValidator);
    decoder.setJwtValidator(validator);
    return decoder;
}
```

We’ve finished talking about resolving the tenant. If you’ve chosen to resolve the tenant by request material, then you’ll need to make sure you address your downstream resource servers in the same way. For example, if you are resolving it by subdomain, you’ll need to address the downstream resource server using the same subdomain. However, if you resolve it by a claim in the bearer token, read on to learn about [Spring Security’s support for bearer token propagation](#oauth2resourceserver-bearertoken-resolver "12.3.21 Bearer Token Resolution").

## 21 Bearer Token Resolution

By default, Resource Server looks for a bearer token in the `Authorization` header. This, however, can be customized in a couple of ways.

### Reading the Bearer Token from a Custom Header

For example, you may have a need to read the bearer token from a custom header. To achieve this, you can wire a `HeaderBearerTokenResolver` instance into the DSL, as you can see in the following example:

```java
http
    .oauth2ResourceServer()
        .bearerTokenResolver(new HeaderBearerTokenResolver("x-goog-iap-jwt-assertion"));
```

### Reading the Bearer Token from a Form Parameter

Or, you may wish to read the token from a form parameter, which you can do by configuring the `DefaultBearerTokenResolver`, as you can see below:

```java
DefaultBearerTokenResolver resolver = new DefaultBearerTokenResolver();
resolver.setAllowFormEncodedBodyParameter(true);
http
    .oauth2ResourceServer()
        .bearerTokenResolver(resolver);
```

## 22 Bearer Token Propagation

Now that you’re in possession of a bearer token, it might be handy to pass that to downstream services. This is quite simple with [`ServletBearerExchangeFilterFunction`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/server/resource/web/reactive/function/client/ServletBearerExchangeFilterFunction.html), which you can see in the following example:

```java
@Bean
public WebClient rest() {
    return WebClient.builder()
            .filter(new ServletBearerExchangeFilterFunction())
            .build();
}
```

When the above `WebClient` is used to perform requests, Spring Security will look up the current `Authentication` and extract any [`AbstractOAuth2Token`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/core/AbstractOAuth2Token.html) credential. Then, it will propagate that token in the `Authorization` header. For example:

```java
this.rest.get()
        .uri("https://other-service.example.com/endpoint")
        .retrieve()
        .bodyToMono(String.class)
        .block()
```

Will invoke the [`https://other-service.example.com/endpoint`](https://other-service.example.com/endpoint), adding the bearer token `Authorization` header for you. In places where you need to override this behavior, it’s a simple matter of supplying the header yourself, like so:

```java
this.rest.get()
        .uri("https://other-service.example.com/endpoint")
        .headers(headers -> headers.setBearerAuth(overridingToken))
        .retrieve()
        .bodyToMono(String.class)
        .block()
```

In this case, the filter will fall back and simply forward the request onto the rest of the web filter chain.

> Unlike the [OAuth 2.0 Client filter function](https://docs.spring.io/spring-security/site/docs/current-SNAPSHOT/api/org/springframework/security/oauth2/client/web/reactive/function/client/ServletOAuth2AuthorizedClientExchangeFilterFunction.html), this filter function makes no attempt to renew the token, should it be expired. To obtain this level of support, please use the OAuth 2.0 Client filter.

### `RestTemplate` support

There is no dedicated support for `RestTemplate` at the moment, but you can achieve propagation quite simply with your own interceptor:

```java
@Bean
RestTemplate rest() {
    RestTemplate rest = new RestTemplate();
    rest.getInterceptors().add((request, body, execution) -> {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return execution.execute(request, body);
        }

        if (!(authentication.getCredentials() instanceof AbstractOAuth2Token)) {
            return execution.execute(request, body);
        }

        AbstractOAuth2Token token = (AbstractOAuth2Token) authentication.getCredentials();
        request.getHeaders().setBearerAuth(token.getTokenValue());
        return execution.execute(request, body);
    });
    return rest;
}
```

