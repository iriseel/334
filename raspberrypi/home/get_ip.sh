ip_address=$(hostname -I)

output_file="ip.md"
echo "Current IP Address: $ip_address" > "$output_file"

echo "IP address saved to $output_file"

#github_username="iriseel"
#github_repository="334"
#github_branch="main"

if ssh -T git@github.com:iriseel/334.git &> /dev/null; then
	echo "SSH key for Github is configured."

	git add "$output_file"

	cd /home/student334/git/334

	git commit -m "Update $output_file with new IP address"
	git push origin "$github_branch"
	echo "File uploaded to Github."
else 
	echo "SSH key for Github not configured."
fi
