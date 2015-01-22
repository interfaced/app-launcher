Руководство по установке приложений на Eltex STB
--------------------------------

1.  Скопировать папку с приложением на USB флэш диск.

2.  Скачать libstbbrowser.so с http://download.eltex-media.ru/nv/nv300/plugins/libstbbrowser.so и скопировать его в папку с приложением.

3.  Вставить USB флэш диск в приставку.

4.  Присоединиться к приставке через telnet:

    **login:** root,

    **password:** MAC-адрес приставки без разделителей.

5.  Ввести команды:

    `mount -o remount,rw /sdk`

    `cd /sdk/qt-install-4.7.0/STBGUI_PLUGIN/`

    `cp -r /mnt/stb/local/$flash_drive/$path_to_appLauncher  appLauncher`

    `sync`

    `reboot`
    
    где

    `$flash_drive` - наименование флэш диска в системе,

    `$path_to_appLauncher` - путь до папки с приложением.

6.  Приложение станет доступным в главном меню.
