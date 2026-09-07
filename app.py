from flask import Flask, jsonify, request, send_from_directory


app = Flask(__name__, static_folder='frontend', static_url_path='')
@app.route('/')
def serve_frontend():
    return send_from_directory('frontend', 'index.html')
tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/health')
def health():
    return jsonify(status='healthy'), 200


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = {'id': len(tasks) + 1, 'title': data['title'], 'done': False}
    tasks.append(task)
    return jsonify(task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def complete_task(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['done'] = True
            return jsonify(task)
    return jsonify(error='Task not found'), 404

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify(message='Deleted'), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)