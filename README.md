# OpenTrons Website

## Installation

To get this to work on DigitalOcean, start with an Apache (LAMP) application instance.

### Check Out the Git Repo

Update the apt-get repos for DigitalOcean's mirrors, install Git.

```
apt-get update
apt-get install git
```

Do an ssh-keygen, add your deploy key, check out this repository.

```
cd /var/www/
rm -r html
git clone git@github.com:OpenTrons/opentrons.com.git ./html
```

### Configure Apache for mod_rewrite

Then (the hard part) enable mod_rewrite in the Apache config so the URLs work.  
Otherwise, contact.html won't be loaded from opentrons.com/contact.

```
a2enmod rewrite
```

Add these lines to the bottom of `/etc/apache2/sites-enabled/000-default.conf`:

```
<Directory /var/www/html>
        AllowOverride All
</Directory>
```

Restart Apache:

```
service apache2 restart
```

### Install mail stuff for the contact form

The contact form uses PHP's sendmail function, which requires some prereqs on the system.

Install postfix: don't read the configuration settings and accept whatever the defaults are.

```
sudo apt-get install postfix
```

Install sendmail.

```
sudo apt-get install sendmail
```

**Test the contact form**.  It's pretty much the most important thing on the site.
