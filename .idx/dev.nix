
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.pnpm # Add pnpm for shadcn-ui
    pkgs.chromium
    pkgs.firebase-tools
  ];
  env = {
    NEXT_PUBLIC_API_URL = "http://localhost:3000";
    HOST = "0.0.0.0";
  };
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "firebase.firebase-vscode"
      "google.gemini-cli-vscode-ide-companion"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm"] "run"; "dev"="--" "--port" "$PORT"="--hostname",== "0.0.0.0"=;
          manager = "web";
        };
      };
    };
    workspace = {
      onCreate = {
        "npm-install" = "npm ci";
      };
      onStart = {};
    };
  };
}
