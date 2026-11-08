Option Explicit

' WScript has no console window.  Keeping it as the scheduled-task action
' prevents the BlueMap publishing job from stealing the active window.
Dim shell
Dim command
Dim exitCode

command = "powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File ""C:\Users\Norbert\Desktop\NRBCK\scripts\sync-bluemap.ps1"""
Set shell = CreateObject("WScript.Shell")
exitCode = shell.Run(command, 0, True)
WScript.Quit exitCode
