# terraform/terraform.tfvars
# Customize these values before running terraform apply

aws_region         = "ap-south-1"
cluster_name       = "gemini-crop-adviser"
kubernetes_version = "1.30"
node_instance_type = "m7i-flex.large"
node_desired       = 2
node_min           = 1
node_max           = 3
