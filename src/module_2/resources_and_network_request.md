# Resources and network request

## Resource

To best comprehend this, I came up with an analogy,

> Marks5 is an hypothetical Nigerian Army's elite military unit. The unit's
> duties include conducting the most deadly and crucial search and rescue
> missions; among other things, they have been known to recover abducted
> individuals and confiscate illicit weapons from the Mafia. All of their
> missions are top priority, and they know how to get the cargo back, whether it
> include people, weapons, or drugs, the cargo is central to the mission.

In the same vein, everything on the internet is a resource, just like Marks5's
cargo --- a music on Spotify, the file you sent to your friend on WhatsAPP, your
user profile on Facebook, an HTML page, a Google search result; everything on
the internet is a resource,

## Making a network request

In this section we would use JavaScript programming language to make a network
request

For the fun part, you can change the `users` from `const key = "users"` to any
of `recipe`, `todos`, `comments`, or `post` to fetch this resource. To make the
request, click on the play icon at the top right corner of the code a seen in
the snapshot

<!-- ![test](../assets/network_request.png) -->

```javascript
// change this
const key = "comments";

fetch(`https://dummyjson.com/${key}`)
  .then((res) => res.json())
  .then(console.log);
```
