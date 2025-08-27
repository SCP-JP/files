# SCPJP-files

This repository is a collection of themes, components, and other resources for the [SCP Foundation Japanese Branch (SCP-JP) wiki](http://scp-jp.wikidot.com/). It provides a centralized place to store, manage, and share code used on the wiki.

## Getting Started

To get started with SCPJP-files, you need to have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine. This project uses Yarn for efficient and reliable management of dependencies.

### Installation

Follow these steps to set up the project on your local machine:

1. **Initial Setup**: Once the dependencies are installed, execute the `make init` command for the initial setup of the project:

```bash
make init
```

This step ensures that all necessary configurations are correctly established for the project to run smoothly.

## Directory Structure

The repository is organized into the following directories:

*   `component/`: Contains reusable components for wiki pages. These are modular pieces of code that can be included on a page to add specific features or visual elements.
    *   **Examples:** `anomaly-class-bar`, `audio-player`, `collapsible-sidebar`, `image-gallery`.
    *   Each component typically includes a `source.txt` file (containing the Wikidot source code and documentation) and one or more `.css` files for styling.

*   `theme/`: Contains complete CSS themes that define the overall look and feel of a wiki.
    *   **Examples:** `black-highlighter-theme`, `sigma-9`, `basalt`, `3law`.

*   `tool/`: Contains web-based tools to help wiki authors and administrators.
    *   `deletion-timer`: A tool to display a countdown timer on a page, likely for pages scheduled for deletion.
    *   `versatile-listpages`: A UI for generating complex `ListPages` queries, which are used to display lists of pages on Wikidot.

*   `util/`: Contains utility files and shared resources, organized by their purpose or area of use on the wiki.
    *   `05command`: Contains assets for a specific group or theme.
    *   `common`: Shared scripts, styles, and media used across multiple components or themes.
    *   `main`: Utilities related to the main wiki themes.
    *   `redirect`: Tools for handling URL redirects.
    *   `sandbox`: A collection of tools and scripts for the user sandbox environment, including draft management and page creation tools.
    *   `storage`: Resources related to file storage and management, such as a file uploader interface.

*   `default/`: Contains default or fallback components.
    *   `scp-os-boot`: A visual component that simulates the boot sequence of an SCP-themed operating system.

## Usage

The themes and components in this repository are designed to be used on a Wikidot site.

### Themes

To use a theme, you need to import its CSS files into your wiki's CSS theme. You can do this by using the `@import` rule in your wiki's CSS editor. For example, to use the `black-highlighter-theme`, you would add the following to your wiki's CSS:

```css
@import url("https://scp-jp.github.io/scpjp-files/theme/black-highlighter-theme/style0.css");
```

### Components

To use a component, you need to include its `source.txt` file in your wiki page. You can do this by using the `[[include]]` directive. For example, to use the `anomaly-class-bar` component, you would add the following to your page:

```
[[include :scp-jp:component:anomaly-class-bar]]
```

Some components may also require you to import a CSS file using the `[[module css]]` directive. Please refer to the documentation in the `source.txt` file for each component for specific usage instructions.
