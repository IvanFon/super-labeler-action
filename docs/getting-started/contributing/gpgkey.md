# Signing Git with GPG using Keybase

This tutorial was originally writen by [Stephen Rees-Carter](https://stephenreescarter.net/signing-git-commits-with-a-keybase-gpg-key/)

We suggest using this method of GPG key setup to reduce the amount of keys you need to maintain when working on your devices, however it's not perfect for everyone. This tutorial assumes that you are working from a private machine.

## Prerequisities

- [Keybase](https://keybase.io/inv/8353caa6be) installed
- GPG Key configured within Keybase
- GPG installed on your device ([Windows](https://www.gpg4win.org/) | [Linux](https://gnupg.org/download/) | [macOS](https://gpgtools.org/))

## Update the GPG Key

1. First, export your public and private keys from Keybase using the `keybase pgp` command:

   ```shell
   keybase pgp export --outfile keybase-public.key
   keybase pgp export --secret --outfile keybase-private.key
   ```

   During the export process, Keybase will ask for your account password and prompt to set a new password for the private key file.

2. Next, you need to import the keys into GPG using the `gpg` command:

   ```shell
   gpg --allow-secret-key-import --import keybase-private.key
   gpg --import keybase-public.key
   ```

   The import process will ask for the password you just assigned to your private key, for obvious reasons.

3. Now that you’ve imported the key into GPG, you need to modify the key to include your email address. This is done by invoking the `gpg --edit-key` command, with a unique identifier for your key. I found using the `<username>@keybase.io` address worked nicely.

   ```shell
   gpg --edit-key <username>@keybase.io
   ```

   This command will get you into the `gpg>` prompt, and from there you need to run the `adduid` command. It will prompt for your `Real name` and `Email address` (feel free to leave `Comment` empty). Once you’ve provided your name and email, confirm using the `O` and then `save` to close the `gpg>` prompt.

4. Using `gpg --edit-key <key>` and selecting the `trust` option. I suggest using trust level `5 = I trust ultimately`, since it is your own key. After applying the change, use `save` to close the prompt.

5. Once that’s done, you can push your updated key back into Keybase.

   ```shell
   keybase pgp update
   ```

6. Add key to [Github](https://github.com) ([follow this tutorial](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account))

7. Setup git signing on commits
   Use the `git config user.signingkey` option to specify the Key ID for git to use. You can get this from the GitHub GPG keys page if you’re unsure what it is. You can also require Git to sign all commits with the `commit.gpgsign` option.

   ```shell
   git config --global user.signingkey <Key ID>
   git config --global commit.gpgsign true
   ```
