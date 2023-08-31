function Start-Update {
  $ConfirmChoice = Read-Host "[YARN] Do you want to update yarn? This will modify source code files and changes need to be comitted. [y/N]"
  if ($ConfirmChoice -eq "y") {
    Assert-Yarn
    Update-Yarn
    Update-Packages
  }
}

function Assert-Yarn {
  npm install yarn --global --no-fund --no-audit
}

function Update-Yarn {
  yarn set version stable
  yarn plugin import interactive-tools
  yarn plugin import typescript
  yarn plugin import workspace-tools
}

function Update-Packages {
  Get-Item yarn.lock | Remove-Item
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
