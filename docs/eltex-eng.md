Installation guide for Eltex STB
--------------------------------

1.  Copy folder with application to USB flash drive.

2.  Download libstbbrowser.so from http://download.eltex-media.ru/nv/nv300/plugins/libstbbrowser.so and copy it to folder with application.

3.  Plug USB flash drive into STB.

4.  Connect to STB via telnet:

    **login:** root,

    **password:** STB's MAC-address without separators.

5.  Enter commands:

    `mount -o remount,rw /sdk`

    `cd /sdk/qt-install-4.7.0/STBGUI_PLUGIN/`

    `cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher`

    `sync`

    `reboot`
    
    where

    `$flash_drive` - flash drive's name in the system,

    `$path_to_appLauncher` - path to the distrib folder.

6.  Application will be available in the main menu.
