# .idx/dev.nix
# Learn more: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.git
    pkgs.gnumake
  ];

  # Workspace-wide environment (can be overridden by your .env)
  env = {
    GEMINI_MODEL = "gemini-1.5-pro";
    SNAPSHOT_DIR = "export";
  };

  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "ms-python.python"
      "ms-python.vscode-pylance"
      "redhat.vscode-yaml"
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          # Runs Next.js dev server in IDX’s web preview
          command = [ "npm" "run" "dev" ];
          manager = "web";
          env = { PORT = "$PORT"; };
        };
      };
    };

    workspace = {
      onCreate = {
        # Install Node deps and Python deps on first create
        npm-install = "npm ci || npm install";
        py-install = ''
          if [ -f requirements.txt ]; then
            pip install -r requirements.txt
          fi
        '';
        default.openFiles = [ ".idx/dev.nix" "README.md" "SYSTEM_DOCS.md" "GEMINIATION.md" ];
      };
      onStart = {
        # Example: run your job flow in a background task if you want snapshots ready
        # jobs-flow = "make run-flow || true";
      };
    };
  };
}