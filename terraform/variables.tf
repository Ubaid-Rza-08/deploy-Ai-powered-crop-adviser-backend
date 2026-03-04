variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-south-1"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "gemini-crop-adviser"
}

variable "kubernetes_version" {
  description = "Kubernetes version for EKS"
  type        = string
  default     = "1.30"
}

variable "node_instance_type" {
  description = "EC2 instance type for EKS nodes"
  type        = string
  default     = "m7i-flex.large"
}

variable "node_desired" {
  description = "Desired number of nodes"
  type        = number
  default     = 2
}

variable "node_min" {
  description = "Minimum number of nodes"
  type        = number
  default     = 1
}

variable "node_max" {
  description = "Maximum number of nodes"
  type        = number
  default     = 3
}
