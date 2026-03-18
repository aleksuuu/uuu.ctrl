{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 3,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 59.0, 119.0, 1000.0, 718.0 ],
        "boxes": [
            {
                "box": {
                    "bgmode": 0,
                    "border": 0,
                    "clickthrough": 0,
                    "enablehscroll": 0,
                    "enablevscroll": 0,
                    "id": "obj-1",
                    "lockeddragscroll": 0,
                    "lockedsize": 0,
                    "maxclass": "bpatcher",
                    "name": "uuu.ctrl.map.maxpat",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "offset": [ 0.0, 0.0 ],
                    "patching_rect": [ -0.8196721076965332, 0.8196721076965332, 252.45900917053223, 463.11474084854126 ],
                    "varname": "uuu.ctrl.map",
                    "viewvisibility": 1
                }
            }
        ],
        "lines": [],
        "parameters": {
            "obj-1::obj-104": [ "createjson", "createjson", 0 ],
            "obj-1::obj-114": [ "seljson", "seljson", 0 ],
            "obj-1::obj-127": [ "hold", "hold", 0 ],
            "obj-1::obj-143": [ "heldmap", "heldmap", 0 ],
            "obj-1::obj-169": [ "syncmap", "syncmap", 0 ],
            "obj-1::obj-189": [ "editmap", "editmap", 0 ],
            "obj-1::obj-193": [ "initmap", "initmap", 0 ],
            "obj-1::obj-37": [ "neverhold", "neverhold", 0 ],
            "obj-1::obj-46": [ "confirmmap", "confirmmap", 0 ],
            "obj-1::obj-58": [ "mapsrc", "mapsrc", 0 ],
            "obj-1::obj-84": [ "usejson", "createjson", 0 ],
            "obj-1::obj-85": [ "flip", "sendbang", 0 ],
            "obj-1::obj-97": [ "sendmidiout", "sendmidiout", 0 ],
            "parameterbanks": {
                "0": {
                    "index": 0,
                    "name": "",
                    "parameters": [ "-", "-", "-", "-", "-", "-", "-", "-" ],
                    "buttons": [ "-", "-", "-", "-", "-", "-", "-", "-" ]
                }
            },
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}