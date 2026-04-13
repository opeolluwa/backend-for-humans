# Protocols

Computer communication would be otherwise impossible without protocols. As a matter of fact, protocols are central to everything we do on the internet or other forms of computer networks. We'll discuss what they are and how they work.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/BnWn18qUYyA?si=iLReW2IBzgSuGa_n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

> [!IMPORTANT]
> Protocols are well-defined rules that determine how computers communicate with each other.

Let's consider this example:

`https://google.com` is a website you can access every day on the internet. Below is a concise description of what happens behind the scenes when you visit a webpage. (Some technical terms are included, but they will be explained on the next page.)

As you might have noticed, a webpage address typically starts with `http://` or `https://`.

1. The browser uses a DNS [^dns] resolver to translate the domain name into an IP[^ip] address of the server.

2. The browser uses this IP address to connect to the server and request for a copy of the resource.

3. The server resolves this request and responds to the browser.

4. The browser receives the response and parses it as HTML[^html].

5. The browser renders the page.

When all these steps happen, we typically say that "the page is loading."

As established earlier in this module, the internet is a collection of resources, and everything we access on the web is stored on a computer somewhere. HTTP[^http] is the protocol that lets us request and access those resources.


[^dns]: DNS is protocol which stands for a Domain Name System  
[^ip]: IP - internet protocol
[^html]: Hypertext Markup Language
[^http]: HTTP - Hypertext Transfer Protocol
