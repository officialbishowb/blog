---
excerpt: This blog explores the use of Google Dorks, advanced search techniques that enable highly specific information retrieval, and compares these capabilities across different search engines.
date: 2024-05-12T22:00:00.000Z
tags:[dorks,advanced-search,google,cybersecurity]
title: Google Dorks: Powerful and yet very dangerous
---
We live in a world where the internet has become a basic necessity. Social media platforms such as Instagram, TikTok, or Facebook are scrolled by millions of people daily. Some use them purely for entertainment purposes, while others use them to obtain "trustworthy" information. One thing that is still in use and will probably remain so for a long time is search engines. Search engines such as Google, Bing, Yahoo, or DuckDuckGo are still relevant today and are being used in various ways. These search engines try their best to index website content by using so-called crawlers that search for new or updated pages. The most commonly used search engine, with nearly 85% of the search market share, is Google [1]. While most people use Google for "normal" queries, it is also possible to perform advanced searches using certain syntaxes that lead to more specific search results. Let us dive into the world of advanced search.

## Before we get to know some common special syntaxes, let us talk about what Google Dorks are in the first place.

Google Dorks, advanced search techniques, refer to the method of finding information online that is generally hidden when using normal search queries. It is a combination of these special syntaxes that makes up a Google Dork. There are many Google Dorks which can be found in the Exploit Database [2] for various categories.

## Now you can probably guess why these advanced search techniques can be beneficial to bad actors.

While normal users can take advantage of Google Dorks to refine their searches and obtain specific search results, bad actors can exploit these same techniques for nefarious purposes.

In penetration testing, the first step, planning and reconnaissance, is a lengthy process that involves defining the scope and goals of a test as well as gathering information to better understand the target. Google Dorks make it easier for testers to search for information more efficiently and avoid wasting time. However, this efficiency can also be used by bad actors to gather more information about their victims or use it for other purposes like finding vulnerabilities or files that may contain credentials or sensitive information.

## Harnessing the power of Google Dorks really does seems to be the way for obtaining more specific search results. But what do they look like?

We will split these into two groups: **commonly** used search queries and **advanced** queries.

Operators that **commonly** in Google Dorking are:

- `site:`
- `intext:`
- `inurl:`
- `intitle`:
- `ext: or filetype:`

These operators are usually used individually to filter search result, such as using `site:thehackingtips.com` to focus on specific domain or `intext:hacking` to filter websites content containing the word **hacking**. Furthermore syntaxes like `inurl` can be used to filter websites URL which contains the given word. While `intitle` can be used to filter websites that contains the search term in the page title, `ext` or `filetype` can be used to limit the search results to the specified file type.

In addition, you can also filter websites with your search terms by enclosing them in quotation marks - `"thehackingtips"` - to find pages that specifically contain **thehackingtips** in their content.

Now these so-called **advanced** queries are nothing more than the combination of the basic syntaxes into a big query that leads to more sophisticated search results. These syntaxes are usually combined with Boolean operators like AND, OR, or by simply using spaces. While the operator *AND* ( `&`) leads to websites that fulfill all criteria, the operator *OR *(`|`) leads to websites that fulfill one of the specified criteria. Here are some examples for advanced queries:

- `filetype:sql intext:password | intext:username`
  - Looks for SQL file containing the words "*password*" or "*username*"
- `intext:password filetype:env OR filetype:config`
  - Looks for configuration or environment files containing the word "*password*"

I hope you were able to get a better overview of the different types of queries.

## Why are they called "Google" dorks? Does not another browsers have such syntaxes?

Google, as mentioned above, is the search engine with the highest market share. Therefore, it has a lot of websites indexed and saved to their database. However, other search engines like DuckDuckGo, which focuses on user privacy, or Bing, another search engine that is owned by Microsoft, have very similar syntaxes to Google to filter the search results. However, search engines like Bing offer unique syntaxes not found in Google, such as `feed:` or `hasfeed:`, which retrieve Atom or RSS feeds from websites matching the search term, or also `location:` which filters the web pages from a specific country or region.

It should be noted that although the syntax is available for a specific browser, it may also work on other browsers.

## Summary

This blog should help you get a better overview of the power of Google Dorks. While they might seem innocent at first, bad actors can exploit these advanced search techniques for activities like information gathering or finding sensitive information. By combining the basic syntaxes, you can get more advanced queries that lead to more specific web results. Finally, although they are called Google Dorks, other browsers like Bing or DuckDuckGo have similar but also unique syntaxes, which may be compatible with different browsers.

# Sources

[Paper used](https://www.utupub.fi/bitstream/handle/10024/150643/abasi_reza_thesis.pdf;jsessionid=9A76E4E7FAFFFA9DF241194EF3A98A50?sequence=1)

[^1] - "The Top 11 Search Engines, Ranked by Popularity" - https://blog.hubspot.com/marketing/top-search-engines - (last accessed at 04/02/2024)

[^2] - "Google Hacking Database" - https://www.exploit-db.com/google-hacking-database - (last accessed at 04/02/2024)
