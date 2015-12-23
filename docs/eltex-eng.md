Installation guide for Eltex STB
--------------------------------

### Eltex STB NV-10x

1.  Copy folder with application to USB flash drive.

2.  Download libstbbrowser.so from http://download.eltex-media.ru/nv/nv102/plugins/libstbbrowser.so and copy it to folder with application.

3.  Plug USB flash drive into STB.

4.  Connect to STB via telnet:

    **login:** root,

    **password:** STB's MAC-address without separators.

5.  Enter commands:

    ```
	mount -o remount,rw /sdk
	cd /sdk/qt-install-4.7.0/STBGUI_PLUGIN/
	cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher
	sync
	reboot
	```
    
    where

    `$flash_drive` - flash drive's name in the system,

    `$path_to_appLauncher` - path to the distrib folder.

6.  Application will be available in the main menu.

### Eltex STB NV-300

1.  Copy folder with application to USB flash drive.

2.  Download libstbbrowser.so from http://download.eltex-media.ru/nv/nv300/plugins/libstbbrowser.so and copy it to folder with application.

3.  Plug USB flash drive into STB.

4.  Connect to STB via SSH:

    **login:** root,

    **password:** is generated from STB serial number:
	- Generator for Windows http://download.eltex-media.ru/nv/psswdgen/PSSWDGen_win.zip
	- Generator for Linux http://download.eltex-media.ru/nv/psswdgen/PSSWDGen-linux-x86_64

5.  Enter commands:

    ```
	mount -o remount,rw /sdk
	cd /usr/local/bin/stbgui/
	cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher
	sync
	reboot
	```
    
    where

    `$flash_drive` - flash drive's name in the system,

    `$path_to_appLauncher` - path to the distrib folder.

6.  Application will be available in the main menu.