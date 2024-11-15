# Protocols

Computer communication would be otherwise impossible without protocol, as a
matter of fact, protocols are central to everything we do on the internet and other forms of computer networks. And
to the honest, it isn't hard at all.



<iframe width="100%" height="315" src="https://www.youtube.com/embed/BnWn18qUYyA?si=iLReW2IBzgSuGa_n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

> [!IMPORTANT]
> Protocol is a well defined set of rules that decides how computer communicates 
let's consider this example :
 


`https://google.com` is a website accessed everyday, here is what goes on under the hood
when you visit the webpage. I'll be using some technical terms but I'll explain them in the next page. 

As you have might have  noticed, a webpage would typically start with an `http://` or `https://`

1. The browser uses a DNS [^dns] resolver to translate the domain name into an IP[^ip] address of the server.
2. The browser uses the IP address to connect to the server and request for a copy of the resource 
3. The server resolves this request and respond to the browser.
4. The browser receives the response and parses it as HTML[^html] 
5. The browser renders the page.

When all these sequence happens, we typically say "the page is loading", 

 As we established in the previous parts of this
module, the internet is a collection of resource. and everything we access on
the web (internet) is stored on a computer somewhere. The HTTP[^http] is a protocol that help us make request to access these resources 


[^dns]: DNS is protocol which stands for a Domain Name System  
[^ip]: IP - internet protocol 
[^html]: Hypertext Markup Language 
[^http]: HTTP - Hypertext Transfer Protocol 
