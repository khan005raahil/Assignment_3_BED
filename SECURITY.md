# Security Configuration

This project includes basic security practices to protect the API from common web vulnerabilities. The main areas covered are HTTP security headers (Helmet) and Cross-Origin Resource Sharing (CORS).

---

## Helmet Configuration

### What was done

Helmet middleware was added with a custom configuration instead of using default settings.

The following options were used:

- Content Security Policy disabled
- X-Powered-By header hidden
- MIME sniffing protection enabled
- HSTS enabled in production
- Frameguard set to deny
- Referrer policy set to no-referrer

### Why this was done

Since this API only returns JSON data and does not serve HTML pages, Content Security Policy was not necessary.

Hiding the X-Powered-By header prevents exposing information about the server.

MIME sniffing protection helps avoid certain types of attacks where browsers guess file types incorrectly.

HSTS ensures that in production, the API is only accessed over HTTPS.

Frameguard prevents clickjacking attacks.

Referrer policy limits the amount of information shared when requests are made.

### Sources

- https://helmetjs.github.io/
- https://owasp.org/www-project-secure-headers/

---

## CORS Configuration

### What was done

A custom CORS configuration was implemented:

- In development: all origins are allowed for easier testing
- In production: only specific allowed origins are permitted
- Allowed methods: GET, POST, PUT, DELETE
- Allowed headers: Content-Type, Authorization
- Credentials support enabled

### Why this was done

Allowing all origins during development makes it easier to test the API without restrictions.

In production, restricting origins helps prevent unauthorized websites from accessing the API.

Limiting methods ensures that only necessary operations are allowed.

Restricting headers improves security by allowing only required headers.

Authorization header is needed for secure API requests.

### Sources

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://expressjs.com/en/resources/middleware/cors.html