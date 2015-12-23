Руководство по установке приложений на Eltex STB
--------------------------------

### Eltex STB NV-10x

1.  Скопировать папку с приложением на USB флэш диск.

2.  Скачать libstbbrowser.so с http://download.eltex-media.ru/nv/nv102/plugins/libstbbrowser.so и скопировать его в папку с приложением.

3.  Вставить USB флэш диск в приставку.

4.  Присоединиться к приставке через telnet:

    **login:** root,

    **password:** MAC-адрес приставки без разделителей.

5.  Ввести команды:

	```
	mount -o remount,rw /sdk
	cd /sdk/qt-install-4.7.0/STBGUI_PLUGIN/
	cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher
	sync
	reboot
	```
    
    где

    `$flash_drive` - наименование флэш диска в системе,

    `$path_to_appLauncher` - путь до папки с приложением.

6.  Приложение станет доступным в главном меню.

### Eltex STB NV-300

1.  Скопировать папку с приложением на USB флэш диск.

2.  Скачать libstbbrowser.so с http://download.eltex-media.ru/nv/nv300/plugins/libstbbrowser.so и скопировать его в папку с приложением.

3.  Вставить USB флэш диск в приставку.

4.  Присоединиться к приставке через SSH:

    **login:** root,

    **password:** генерируется на основе серийного номера приставки:
	- генератор паролей под Windows  http://download.eltex-media.ru/nv/psswdgen/PSSWDGen_win.zip
	- генератор паролей под Linux http://download.eltex-media.ru/nv/psswdgen/PSSWDGen-linux-x86_64

5.  Ввести команды:

	```
	mount -o remount,rw /sdk
	cd /usr/local/bin/stbgui/
	cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher
	sync
	reboot
	```
    
    где

    `$flash_drive` - наименование флэш диска в системе,

    `$path_to_appLauncher` - путь до папки с приложением.

6.  Приложение станет доступным в главном меню.
