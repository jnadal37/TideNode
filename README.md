# TideNode
Node.JS Application to see current tide information


# how to kill the already running process:


sudo netstat -lpn |grep :'8081'
8081 is port i was looking for, After first command you will have Process ID for that port

kill -9 1192
in my case 1192 was process Id of process running on 8081 PORT use -9 for Force kill the process


#how to install/update the app


from /usr/src/
    (first kill old version:

    sudo rm -r TideNode/
    )


	sudo git clone https://github.com/jnadal37/TideNode.git

from /usr/src/TideNode/
	sudo nodejs tidechart.js

from web browser:
	http://localhost:8081

to remove:
from /usr/src/
    sudo rm -r TodeNode/

to reboot:
    sudo reboot

autostart set up in





## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/jnadal37/TideNode/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/jnadal37/TideNode/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.

