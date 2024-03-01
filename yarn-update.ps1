function Start-Update {
  if ($PSVersionTable.PSVersion.Major -lt 7) {
    throw "This script can only be run with PowerShell v7 or higher! Please install a newer version from Company Portal."
  }

  Assert-Yarn
  Update-Yarn
  Update-Packages
}

function Assert-Yarn {
  npm install yarn --global --no-fund --no-audit
}

function Update-Yarn {
  $ConfirmChoice = Read-Host "[YARN] Do you want to update yarn to latest version? [Y/n]"
  if ($ConfirmChoice -ne "n") {
    yarn set version stable
  }
}

function Update-Packages {
  $ConfirmChoice = Read-Host "[YARN] Do you want to update all packages to their latest semver range? This will recreate the yarn.lock file. [y/N]"
  if ($ConfirmChoice -eq "y") {
    Get-Item yarn.lock | Remove-Item
  }

  yarn install
}

try {
  Start-Update
}
catch {
  Write-Error $_
}
finally {
  if ($IsWindows) {
    cmd /c pause
  }
  else {
    Pause
  }
}
