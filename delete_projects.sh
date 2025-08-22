for project_number in $(gh project list --owner course-dprep --format json | jq -r '.projects[].number'); do
    echo "Deleting project number: $project_number..."
    expect -c "
    spawn gh project delete $project_number --owner course-dprep
    expect \"Type 'co' to confirm: \"
    send \"co\r\"
    expect eof
    "
done

