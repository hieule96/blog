---
title: >-
  Jpeg streaming buffer:  In a research of a better way to improve the jpeg
  decode
date: '2026-01-04'
draft: false
tags: []
categories:
  - tutorial
lastmod: '2026-01-04T17:22:33.335Z'
---
# Introduction

JPEG image is delimited by the SOI and EOI in the specification.

Each time we receive an buffer from the network, we need to search for the SOI and EOI.

SOI (xFFx08): Start of Frame
EOI (xFFx09): End of Frame

